/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const express = require("express");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static("dist"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get("*", (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});
