
export const languages = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "php", label: "PHP" },
  { id: "csharp", label: "C#" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  // Piston‑supported additions
  { id: "c++", label: "C++" },
  { id: "bash", label: "Bash" },
  { id: "clojure", label: "Clojure" },
  { id: "cobol", label: "COBOL" },
  { id: "crystal", label: "Crystal" },
  { id: "dart", label: "Dart" },
  { id: "elixir", label: "Elixir" },
  { id: "erlang", label: "Erlang" },
  { id: "fortran", label: "Fortran" },
  { id: "fsharp", label: "F#" },
  { id: "lua", label: "Lua" },
  { id: "nim", label: "Nim" },
  { id: "ocaml", label: "OCaml" },
  { id: "perl", label: "Perl" },
  { id: "powershell", label: "PowerShell" },
  { id: "r", label: "R" },
  { id: "racket", label: "Racket" },
  { id: "raku", label: "Raku" },
  { id: "ruby", label: "Ruby" },
  { id: "scala", label: "Scala" },
  { id: "sql", label: "SQL" },
] as const;

// TypeScript: derived type for allowed ids
export type LanguageId = typeof languages[number]["id"];
