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

export const detectInputRequests = (code: string, language: string): string[] => {
  const normalizedLanguage = (language || "").toLowerCase();
  const languageConfig = INPUT_REGEX_BY_LANGUAGE.find(({ test }) =>
    test(normalizedLanguage),
  );
  const regexes = languageConfig?.regexes ?? FALLBACK_REGEXES;

  const results: string[] = [];
  for (const regex of regexes) {
    const matches = code.match(regex) ?? [];
    results.push(...matches);
  }

  return Array.from(new Set(results));
};
