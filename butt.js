const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const buttPath = path.join(__dirname, "butt.js");
const butt = fs.readFileSync(buttPath);
const lines = butt
  .toString()
  .split("\n")
  .filter((l) => l);
lines.reverse();
const then = new Date(lines[0].match(/\/\*(.+)\*\//)[1].trim());
const now = new Date();
if (then.getDate() === now.getDate()) {
  console.log("Already did a butt today")
  process.exit(0);
}
const message = now.toISOString();
lines.splice(0, 1, `/* ${message} */`);
lines.reverse();
const doc = lines.join("\n");
fs.writeFileSync(buttPath, doc);
const retry = (fn, maxtries, delay) => {
  try {
    fn();
  } catch (err) {
    if (maxTries <= 0) throw err;
    setTimeout(() => retry(fn, maxtries, delay), delay);
  }
};
retry(
  () => {
    execSync(`git add . && git commit -m "${message}"`);
    execSync("git push origin master");
  },
  100,
  5000
);
/* 2022-04-19T09:11:49.968Z */