export const languages = [
  // Playground-supported UI languages
  {
    id: "react",
    label: "React.js",
    defaultCode: `function App() {
  return (
    <div style={{ padding: "24px", fontFamily: "system-ui" }}>
      <h1>Hello React on TinyGround</h1>
      <p>Edit this code and click Play.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`,
  },
  {
    id: "html",
    label: "HTML",
    defaultCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tiny Playground</title>
  </head>
  <body>
    <h1>Hello TinyGround</h1>
    <p>Edit this code and click Play.</p>
  </body>
</html>`,
  },
  {
    id: "vue",
    label: "Vue.js",
    defaultCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tiny Playground</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const { createApp, ref } = Vue;

      createApp({
        setup() {
          const count = ref(0);
          return { count };
        },
        template:
          '<div style="padding: 24px; font-family: system-ui;">' +
          "<h1>Hello Vue on TinyGround</h1>" +
          "<p>Edit this code and click Play.</p>" +
          '<button @click="count++">Count: {{ count }}</button>' +
          "</div>",
      }).mount("#app");
    </script>
  </body>
</html>`,
  },

  // Judge0 / backend languages (normalized to latest available runtime)
  { id: 45, label: "Assembly", defaultCode: "" },
  { id: 46, label: "Bash", defaultCode: "" },
  { id: 47, label: "Basic", defaultCode: "" },
  { id: 110, label: "C", defaultCode: "" },
  { id: 105, label: "C++", defaultCode: "" },
  { id: 86, label: "Clojure", defaultCode: "" },
  { id: 51, label: "C#", defaultCode: "" },
  { id: 77, label: "COBOL", defaultCode: "" },
  { id: 55, label: "Common Lisp", defaultCode: "" },
  { id: 90, label: "Dart", defaultCode: "" },
  { id: 56, label: "D", defaultCode: "" },
  { id: 57, label: "Elixir", defaultCode: "" },
  { id: 58, label: "Erlang", defaultCode: "" },
  { id: 44, label: "Executable", defaultCode: "" },
  { id: 87, label: "F#", defaultCode: "" },
  { id: 59, label: "Fortran", defaultCode: "" },
  { id: 107, label: "Go", defaultCode: "" },
  { id: 88, label: "Groovy", defaultCode: "" },
  { id: 61, label: "Haskell", defaultCode: "" },
  { id: 91, label: "Java", defaultCode: "" },
  { id: 96, label: "JavaFX", defaultCode: "" },
  { id: 102, label: "JavaScript", defaultCode: "" },
  { id: 111, label: "Kotlin", defaultCode: "" },
  { id: 64, label: "Lua", defaultCode: "" },
  { id: 89, label: "Multi-file program", defaultCode: "" },
  { id: 79, label: "Objective-C", defaultCode: "" },
  { id: 65, label: "OCaml", defaultCode: "" },
  { id: 66, label: "Octave", defaultCode: "" },
  { id: 67, label: "Pascal", defaultCode: "" },
  { id: 85, label: "Perl", defaultCode: "" },
  { id: 98, label: "PHP", defaultCode: "" },
  { id: 43, label: "Plain Text", defaultCode: "" },
  { id: 69, label: "Prolog", defaultCode: "" },
  {
    id: 113,
    label: "Python",
    defaultCode: `# Demo: uses stdin (enter values in the stdin box)
name = input("Enter your name: ").strip()
a = int(input("Enter first number: ").strip())
b = int(input("Enter second number: ").strip())

print(f"Hello, {name}!")
print("Sum:", a + b)
`,
  },
  { id: 99, label: "R", defaultCode: "" },
  { id: 72, label: "Ruby", defaultCode: "" },
  { id: 108, label: "Rust", defaultCode: "" },
  { id: 112, label: "Scala", defaultCode: "" },
  { id: 82, label: "SQL", defaultCode: "" },
  { id: 83, label: "Swift", defaultCode: "" },
  { id: 101, label: "TypeScript", defaultCode: "" },
  { id: 84, label: "Visual Basic .NET", defaultCode: "" },
] as const;

// Type: supports both string + number ids
export type LanguageId = (typeof languages)[number]["id"];
