
export const languages = [
  {
    id: "react",
    label: "React.js",
    defaultCode: `function App() {
  return (
    <div style={{ padding: "24px", fontFamily: "system-ui" }}>
      <h1>Hello React</h1>
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
    <title>One Playground</title>
  </head>
  <body>
    <h1>Hello Playground</h1>
    <p>Edit this code and click Play.</p>
  </body>
</html>`,
  },
] as const;

// TypeScript: derived type for allowed ids
export type LanguageId = typeof languages[number]["id"];
