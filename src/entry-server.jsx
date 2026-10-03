import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { loadPostFromPath } from "./data/content";
export async function render(path) {
  await loadPostFromPath(path);
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  );
}
