import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const remix = fileURLToPath(
  new URL("../node_modules/remixicon/", import.meta.url),
);
const icons = join(remix, "icons");
const INTERFACE = {
  help: "question-line",
  person: "user-3-line",
  gear: "settings-line",
  dots: "more-line",
  plus: "add-line",
  pencil: "edit-2-line",
  trash: "delete-bin-line",
  "chevron-right": "arrow-right-s-line",
  "chevron-down": "arrow-down-s-line",
  laptop: "cpu-line",
  network: "server-line",
  cloud: "cloud-line",
  check: "check-line",
  "side-wide": "layout-left-line",
  "side-narrow": "layout-left-2-line",
  market: "apps-line",
  folder: "folder-line",
  doc: "file-line",
  expand: "fullscreen-line",
  search: "search-line",
  go: "arrow-right-up-line",
  send: "arrow-up-line",
  edit: "edit-line",
  "attach-plus": "add-line",
  "lock-closed": "lock-line",
  palette: "palette-line",
  keyboard: "keyboard-box-line",
  package: "box-3-line",
  plug: "plug-line",
  clock: "time-line",
  eye: "eye-line",
  terminal: "terminal-box-line",
  brain: "brain-line",
  sun: "sun-line",
  moon: "moon-line",
  chat: "chat-3-line",
  hammer: "hammer-line",
  code: "code-s-slash-line",
  image: "image-line",
  table: "table-line",
  // `flow-chart` and `hand` ship in one outline variant only.
  diagram: "flow-chart",
  chart: "bar-chart-line",
  fork: "git-fork-line",
  tune: "equalizer-line",
  copy: "file-copy-line",
  "level-manual": "hand",
  "level-auto": "shield-check-line",
  "level-skip": "shield-line",
  skills: "receipt-line",
  download: "download-line",
  "progress-1": "progress-1-line",
  "progress-2": "progress-2-line",
  "progress-3": "progress-3-line",
  "progress-4": "progress-4-line",
  "progress-5": "progress-5-line",
  "progress-6": "progress-6-line",
  "progress-7": "progress-7-line",
  "progress-8": "progress-8-line",
  restart: "refresh-line",
  server: "cpu-line",
  close: "close-line",
  globe: "global-line",
};

/** Transcript role → its Remix line mark. The built-in set already draws
 *  these in line variants, so the port carries the same names. */
const CHAT = {
  back: "arrow-left-line",
  brain: "brain-line",
  camera: "camera-line",
  check: "check-line",
  "chevron-down": "arrow-down-s-line",
  alert: "error-warning-line",
  clock: "time-line",
  code: "code-line",
  eye: "eye-line",
  globe: "global-line",
  hammer: "hammer-line",
  image: "image-line",
  keyboard: "keyboard-line",
  click: "cursor-line",
  scroll: "scroll-to-bottom-line",
  search: "search-line",
  pen: "edit-box-line",
  terminal: "terminal-line",
  x: "close-line",
};

const files = new Map();
for (const category of readdirSync(icons)) {
  for (const file of readdirSync(join(icons, category))) {
    if (file.endsWith(".svg"))
      files.set(file.slice(0, -4), join(icons, category, file));
  }
}
for (const [folder, roles] of [
  ["icons", INTERFACE],
  ["icons/chat", CHAT],
]) {
  mkdirSync(join(root, folder), { recursive: true });
  for (const [role, glyph] of Object.entries(roles)) {
    const source = files.get(glyph);
    if (!source) throw new Error(`Unknown Remix Icon: ${glyph}`);
    writeFileSync(join(root, folder, `${role}.svg`), readFileSync(source));
  }
}
writeFileSync(
  join(root, "icons/manifest.json"),
  JSON.stringify({ name: "Cupertino" }) + "\n",
);
console.log("Cupertino icons generated from Remix Icon 4.8.0.");
