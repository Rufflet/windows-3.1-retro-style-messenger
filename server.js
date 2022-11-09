/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("*", (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});
