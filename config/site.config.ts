
export const languages = [
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
] as const;

// TypeScript: derived type for allowed ids
export type LanguageId = typeof languages[number]["id"];
