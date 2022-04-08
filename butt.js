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
const retry = (fn, delay) => {
  try {
    fn();
  } catch (err) {
    if (maxTries <= 0) throw err;
    setTimeout(() => retry(fn, delay), delay);
  }
};
retry(
  () => {
    execSync(`git add . && git commit -m "${message}"`);
    execSync("git push origin master");
  },
  5000
);
/* 08/04/2022, 09:00:02 */