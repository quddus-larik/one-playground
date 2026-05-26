
import { useUserCode } from "@/stores/code.state";
import { useSelectedLanguage } from "@/stores/lang.state";
import { useOutput } from "@/stores/output.state";
import { useStdinState } from "@/stores/stdin.state";

interface RunCodeInterface {
  code?: string;
  language?: string;
  stdin?: string;
}

const HTML_LANGUAGES = new Set(["html", "react", "vue"]);
const BACKEND_RUN_URL =
  process.env.NEXT_PUBLIC_BACKEND_RUN_URL ?? "/api/run";

interface RunApiResponse {
  language_id?: number;
  status?: string | null;
  needs_input?: boolean;
  input_prompt?: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  time?: number | null;
  memory?: number | null;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalizePromptSequence = (
  text: string | undefined,
  promptTitles: string[],
) => {
  if (!text || promptTitles.length === 0) return text ?? "";

  let normalized = text;
  for (let index = 1; index < promptTitles.length; index += 1) {
    const title = promptTitles[index]?.trim();
    if (!title) continue;

    // Add a line break before the next prompt if prompts are printed on one line.
    const pattern = new RegExp(`\\s+(${escapeRegExp(title)})`, "g");
    normalized = normalized.replace(pattern, "\n$1");
  }

  return normalized;
};

const buildHtmlShell = (body: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body { margin: 0; padding: 0; font-family: ui-sans-serif, system-ui; }
      #root { min-height: 100vh; }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>`;

const buildReactShell = (code: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body { margin: 0; padding: 0; font-family: ui-sans-serif, system-ui; }
      #root { min-height: 100vh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
      ${code}
    </script>
  </body>
</html>`;

const looksLikeFullHtml = (code: string) =>
  /<\s*html[\s>]|<\s*body[\s>]|<!doctype/i.test(code);

const parseLanguageId = (value: string) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

const formatRunResult = (result: RunApiResponse) => {
  const { inputRequests } = useStdinState.getState();
  const promptTitles = inputRequests.map((item) => item.title);
  const stdout = normalizePromptSequence(result.stdout, promptTitles);

  const parts = [
    stdout.trim(),
    result.stderr?.trim(),
    result.compile_output?.trim(),
    result.message?.trim(),
  ].filter(Boolean);

  if (parts.length > 0) {
    return parts.join("\n");
  }

  if (result.status) {
    return `Execution finished: ${result.status}`;
  }

  return "Execution finished with no output.";
};

const runWithBackend = async ({
  sourceCode,
  languageId,
  stdin,
}: {
  sourceCode: string;
  languageId: number;
  stdin?: string;
}) => {
  const response = await fetch(BACKEND_RUN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source_code: sourceCode,
      language_id: languageId,
      stdin: stdin ?? "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return (await response.json()) as RunApiResponse;
};

export async function handleRunCode({
  code,
  language,
  stdin,
}: RunCodeInterface = {}) {
  const selectedLanguage =
    (language ?? useSelectedLanguage.getState().selectedLanguageState ?? "javascript").toLowerCase();
  const userCode = code ?? useUserCode.getState().userCode ?? "";
  const { setOutput, setRunning } = useOutput.getState();
  const { stdin: storedStdin } = useStdinState.getState();
  const activeStdin = stdin ?? storedStdin;

  setOutput("");
  setRunning(true);

  if (HTML_LANGUAGES.has(selectedLanguage)) {
    if (selectedLanguage === "react") {
      setOutput(buildReactShell(userCode));
      setRunning(false);
      return;
    }

    const html = looksLikeFullHtml(userCode)
      ? userCode
      : buildHtmlShell(userCode);
    setOutput(html);
    setRunning(false);
    return;
  }

  const languageId = parseLanguageId(selectedLanguage);
  if (languageId === null) {
    setOutput(`Unsupported backend language key: ${selectedLanguage}`);
    setRunning(false);
    return;
  }

  try {
    const result = await runWithBackend({
      sourceCode: userCode,
      languageId,
      stdin: activeStdin,
    });

    if (result.needs_input && !activeStdin.trim()) {
      setOutput(result.input_prompt || "Program requires stdin. Enter input to continue.");
      return;
    }

    setOutput(formatRunResult(result));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    setOutput(
      `Execution failed. Make sure backend is running at ${BACKEND_RUN_URL}\n${message}`,
    );
  } finally {
    setRunning(false);
  }
}
