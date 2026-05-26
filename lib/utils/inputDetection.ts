import type { InputRequestItem } from "@/stores/stdin.state";

const INPUT_REGEX_BY_LANGUAGE: Array<{
  test: (language: string) => boolean;
  regexes: RegExp[];
}> = [
  {
    test: (language) => language === "113" || language === "python",
    regexes: [/\binput\s*\(([^)]*)\)/g],
  },
  {
    test: (language) => language === "102" || language === "javascript",
    regexes: [/\bprompt\s*\(([^)]*)\)/g, /\breadlineSync\s*\(([^)]*)\)/g],
  },
  {
    test: (language) => language === "105" || language === "110",
    regexes: [/\bscanf\s*\(([^)]*)\)/g, /\bcin\s*>>/g],
  },
  {
    test: (language) => language === "91",
    regexes: [/\bnext(?:Int|Long|Double|Float|Line)?\s*\(/g],
  },
];

const FALLBACK_REGEXES = [
  /\binput\s*\(([^)]*)\)/g,
  /\bscanf\s*\(([^)]*)\)/g,
  /\bcin\s*>>/g,
  /\bnext(?:Int|Long|Double|Float|Line)?\s*\(/g,
  /\breadlineSync\s*\(([^)]*)\)/g,
];

export const NON_BACKEND_LANGUAGES = new Set(["html", "react", "vue"]);

const extractPromptTitle = (argExpression: string, fallbackIndex: number) => {
  const arg = argExpression.trim();
  if (!arg) return `Input ${fallbackIndex}`;

  const quoteMatch = arg.match(/^["'`](.*)["'`]$/);
  if (quoteMatch?.[1]) {
    const cleaned = quoteMatch[1].trim();
    return cleaned.length > 0 ? cleaned : `Input ${fallbackIndex}`;
  }

  return `Input ${fallbackIndex}`;
};

export const detectInputRequests = (
  code: string,
  language: string,
): InputRequestItem[] => {
  const normalizedLanguage = (language || "").toLowerCase();
  const languageConfig = INPUT_REGEX_BY_LANGUAGE.find(({ test }) =>
    test(normalizedLanguage),
  );
  const regexes = languageConfig?.regexes ?? FALLBACK_REGEXES;

  const results: InputRequestItem[] = [];
  let sequence = 1;

  for (const regex of regexes) {
    const globalRegex = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : `${regex.flags}g`);
    let match = globalRegex.exec(code);
    while (match) {
      const argExpression = match[1] ?? "";
      results.push({
        title: extractPromptTitle(argExpression, sequence),
        input: "",
      });
      sequence += 1;
      match = globalRegex.exec(code);
    }
  }

  return results;
};
