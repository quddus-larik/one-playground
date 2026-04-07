"use client";

import dynamic from "next/dynamic";
import type { Monaco } from "@monaco-editor/react";
import { useUserCode } from "@/stores/code.state";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const PURPLE_THEME_ID = "one-purple";
const definePurpleTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme(PURPLE_THEME_ID, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "9B8AC7", fontStyle: "italic" },
      { token: "keyword", foreground: "CFA7FF" },
      { token: "number", foreground: "F5A97F" },
      { token: "string", foreground: "D1F5C6" },
      { token: "type.identifier", foreground: "9BB8FF" },
    ],
    colors: {
      "editor.background": "#191724",
      "editor.foreground": "#E8E3F8",
      "editorLineNumber.foreground": "#7F72A8",
      "editorLineNumber.activeForeground": "#CBB6FF",
      "editorCursor.foreground": "#D6B3FF",
      "editor.selectionBackground": "#3F2E63",
      "editor.inactiveSelectionBackground": "#2C2146",
      "editor.lineHighlightBackground": "#241C35",
      "editorGutter.background": "#191724",
      "editorIndentGuide.background": "#2F2447",
      "editorIndentGuide.activeBackground": "#4A3570",
      "editorSuggestWidget.selectedBackground": "#2B1B45",
      "editorSuggestWidget.selectedForeground": "#F3EEFF",
    },
  });
};

interface CodeEditorInterface {
  language?: string;
}

export function CodeEditor({ language = "javascript" }: CodeEditorInterface) {
  const { userCode, setUserCode } = useUserCode();
  const editorLanguage = language.toLowerCase() === "react" ? "javascript" : language;

  return (
    <div className="monaco-shell h-full w-full rounded-xl bg-background">
      <Editor
        height="100%"
        width="100%"
        language={editorLanguage}
        theme={PURPLE_THEME_ID}
        beforeMount={definePurpleTheme}
        value={userCode}
        onChange={(value) => setUserCode({ userCode: value ?? "" })}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 16,
          fontFamily:
            "JetBrains Mono, var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          padding: { top: 12, bottom: 12 },
          glyphMargin: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          suggestOnTrigger: false,
          quickSuggestions: false,
          wordBasedSuggestions: "off",
          inlineSuggest: { enabled: false },
          parameterHints: { enabled: false },
          acceptSuggestionOnEnter: "off",
          tabCompletion: "off",
        }}
      />
    </div>
  );
}
