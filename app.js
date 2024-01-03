const express = require("express");
const logger = require("morgan");
const path = require("path");
const compression = require("compression");
const app = express();

app.use(logger("dev"));
app.use(express.static("./build"));
app.use("/static", express.static("ui"));
app.use(compression());
app.disable("x-powered-by");

app.get("/*", function (req, res) {
  res
    .set({
      "X-Frame-Options": "SAMEORIGIN",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "referrer-policy": "no-referrer",
      "x-xss-protection": 0,
    })
    .sendFile(path.join(__dirname, "./build", "index.html"));
});

const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}!`);
});
