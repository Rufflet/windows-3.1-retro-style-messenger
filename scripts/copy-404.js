/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const notFoundHtml = path.join(dist, "404.html");

if (!fs.existsSync(indexHtml)) {
  console.error("dist/index.html not found — run webpack first");
  process.exit(1);
}

fs.copyFileSync(indexHtml, notFoundHtml);
console.log("Copied dist/index.html → dist/404.html");
