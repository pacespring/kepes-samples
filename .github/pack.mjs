// catalogue.json → dist/<name>.zip (the folder's contents, no top directory) + dist/index.json (the catalogue + sizes)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";

const cat = JSON.parse(readFileSync("catalogue.json", "utf8"));
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
const samples = [];
for (const s of cat.samples ?? []) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(s.name)) throw new Error(`“${s.name}” is not a sample name (lower-case words joined by -)`);
  if (!existsSync(`${s.name}/.kepes/workspace.json`)) throw new Error(`${s.name}/ is not a Kepes workspace`);
  const q = typeof s.question === "string" ? s.question : s.question?.en;
  if (!q) throw new Error(`${s.name}: the catalogue row has no question`);
  execFileSync("zip", ["-r", "-X", "-q", `../dist/${s.name}.zip`, ".", "-x", "*.DS_Store"], { cwd: s.name, stdio: "inherit" });
  samples.push({ ...s, size: statSync(`dist/${s.name}.zip`).size });
  console.log(`${s.name}.zip ${(statSync(`dist/${s.name}.zip`).size / 1e6).toFixed(1)} MB`);
}
writeFileSync("dist/index.json", JSON.stringify({ version: 1, samples }, null, 2) + "\n");
