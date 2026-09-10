import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const stage = mkdtempSync(join(tmpdir(), "cupertino-theme-"));
const archive = join(root, "dist/cupertino.tar.gz");
try {
  mkdirSync(join(stage, "cupertino"));
  mkdirSync(join(root, "dist"), { recursive: true });
  for (const file of [
    "manifest.json",
    "theme.css",
    "light.css",
    "dark.css",
    "fonts",
    "icons",
    "LICENSE.txt",
    "README.md",
  ]) {
    cpSync(join(root, file), join(stage, "cupertino", file), {
      recursive: true,
    });
  }
  execFileSync("tar", ["-czf", archive, "-C", stage, "cupertino"]);
  console.log(
    `${createHash("sha256").update(readFileSync(archive)).digest("hex")}  cupertino.tar.gz`,
  );
} finally {
  rmSync(stage, { recursive: true, force: true });
}
