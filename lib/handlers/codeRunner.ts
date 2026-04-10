
import { useUserCode } from "@/stores/code.state";
import { useSelectedLanguage } from "@/stores/lang.state";
import { useOutput } from "@/stores/output.state";

interface RunCodeInterface {
  code?: string;
  language?: string;
}

const HTML_LANGUAGES = new Set(["html", "react", "vue"]);

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

export function handleRunCode({
  code,
  language,
}: RunCodeInterface = {}) {
  const selectedLanguage =
    (language ?? useSelectedLanguage.getState().selectedLanguageState ?? "javascript").toLowerCase();
  const userCode = code ?? useUserCode.getState().userCode ?? "";
  const { setOutput, setRunning } = useOutput.getState();

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

  setOutput(userCode);
  setRunning(false);
}
