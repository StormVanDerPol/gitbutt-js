const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const buttPath = path.join(__dirname, "butt.js");
const message = new Date().toLocaleString();
const butt = fs.readFileSync(buttPath);
const lines = butt
  .toString()
  .split("\n")
  .filter((l) => l);
lines.reverse().splice(0, 1, `/* ${message} */`);
lines.reverse();
const doc = lines.join("\n");
fs.writeFileSync(buttPath, doc);
execSync(`git add . && git commit -m "${message}"`);
execSync("git push origin master");
/* 1/3/2022, 1:00:01 PM */