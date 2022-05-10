const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const buttMap = {
  1: 'Moon butt',
  2: 'Tuesbutt',
  3: 'Wednesbutt',
  4: 'Thursbutt',
  5: 'Fried butt',
  6: 'Sabath butt',
  0: 'Sun butt',
}
const buttPath = path.join(__dirname, "butt.js");
const butt = fs.readFileSync(buttPath);
const lines = butt
  .toString()
  .split("\n")
  .filter((l) => l);
lines.reverse();
const then = new Date(lines[0].match(/\/\*(.+?)\*\//)[1].trim());
const now = new Date();
if (then.getDate() === now.getDate()) {
  console.log("Already did a butt today")
  process.exit(0);
}
lines.splice(0, 1, `/* ${now.toISOString()} */`);
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
    const buttDay = buttMap[now.getDay()];
    const isWednesday = buttDay === buttMap[3];
    execSync(`git add . && git commit -m "it's ${buttMap[now.getDay()]}${isWednesday ? ", my dudes!" : ''} ${now.toLocaleString()}"`);
    execSync("git push origin master");
  },
  100,
  5000
);
/* 2022-05-10T05:34:01.985Z */