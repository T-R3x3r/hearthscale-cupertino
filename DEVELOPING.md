# Developing Cupertino

`README.md` is the text the Marketplace shows under **About** on the listing of Cupertino, so it is written for the people who install it. This file is for the people who work on it.

Cupertino needs a Hearthscale desktop that reads one corner through its roles (`--r`,
`--r-ctl`, `--r-card`, `--r-tile`) and draws the background blobs, the gloss and the
shadows from a colourway's colour inputs. Earlier builds do not read them. The pictures
in `previews/` were captured in the Windows desktop at 100% interface size.

## Work on it

This repository is an ordinary theme folder, with no application code or privileged
loader path. There is no build step for editing CSS. To see each save at once while you
work, start Hearthscale's development desktop from a source checkout with
`HEARTHSCALE_DEV_THEME` naming your clone. To make a theme of your own from it, copy
the folder and change the id and the name in `manifest.json`. Cupertino is a worked
example of the theme guide,
[Examples: Compact and Cupertino](https://hearthscale.com/docs/developers/themes/examples).

| File                               | Purpose                                                              |
| ---------------------------------- | -------------------------------------------------------------------- |
| `manifest.json`                    | Id (the folder's name), name, version, description and author        |
| `theme.css`                        | Component geometry, typography, motion, materials and state styling  |
| `light.css`, `dark.css`            | Independent colourways: colours only                                 |
| `icons/`                           | Remix Icon SVGs keyed by interface role; transcript roles in `chat/` |
| `fonts/manifest.json`              | Font families; no font binaries are bundled                          |
| `LICENSE.txt`, `icons/LICENSE.txt` | Upstream notices                                                     |

The theme layer follows Hearthscale's base styles. Colourways follow the theme, so
use `var(--accent)` and `var(--accent-ink)` for selection instead of hardcoding blue
into component selectors. Our colourways supply the blue. The shell's public `hs-*`
component classes are documented in Hearthscale's `packages/ui/CLASSES.md` and
`packages/ui/src/shell.css`.

Keep assets local. The loader rejects remote CSS imports/URLs, `!important`, and
unbalanced braces. `--bg` and `--capt` in colourway sheets must be literal colours
because the native frame reads them before CSS renders. Approval controls remain
subject to the guard layer's presence and interaction rules; their presentation can be themed.
CSS is trusted author code, so this guard is not a sandbox for hostile themes. Native
OS menus/window controls, third-party website content and the avatar rig are outside
the stylesheet boundary.

`--session-row-height`, `--subagent-row-height` and `--project-row-height` size the
virtual list's slots. Keep the corresponding visible rows within their slots.
Hearthscale measures those slots when a theme or its density changes.

## Icons and release

The SVGs are committed, so installing needs no Node dependencies. To regenerate:

```sh
npm ci
npm run icons
```

A release is a GitHub release whose tag is the `version` in `manifest.json`, without
a `v`, with the archive that `hearthscale pack .` writes attached. See
[Publish to the Marketplace](https://hearthscale.com/docs/developers/publish).

The font stack uses SF Pro where installed, then the platform's interface font. Apple's
fonts are not redistributed. Remix Icon 4.8.0, its last release under Apache-2.0,
supplies the line glyphs; Obsidian Cupertino's adapted values retain its MIT notice.
This is a Hearthscale port, not an Apple product or an upstream Obsidian release.
