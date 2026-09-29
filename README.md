# kepes-samples

Sample workspaces for Kepes. Each directory is a workspace folder built in Kepes:
the documents, `.kepes/` (the graph, views, trails) and `.kepes-cache/` (text layers and pictures the app
would otherwise make again). Open one from Kepes: **workspace menu ▸ Open a sample…**, or from a link
`kepes://sample/<name>`.

## Adding or updating a sample

1. Build the workspace in Kepes (it lives in `~/Kepes/<name>`). Leave the tab you want seen first open, let
   every reading finish, then quit Kepes.
2. From the Kepes source repo:
   `node scripts/publish-sample.mjs ~/Kepes/<name> <this checkout> [--name <slug>]`
3. Write the row's `question` and `title` in `catalogue.json` (English and Vietnamese).
4. Commit and push. The `publish` workflow zips every sample in the catalogue and puts the zips and
   `index.json` on the [`samples` release](../../releases/tag/samples).

A directory not in `catalogue.json` is a draft: it is kept in the repo but not published.

## Rules

- Only documents we may redistribute: open-access papers, public-domain or CC-licensed texts, our own notes.
  Web pages are better kept as links (Kepes reads them again) than as saved copies.
- No chat, no API keys: `publish-sample.mjs` never copies `local.json` or the app's chat sessions.
- Documents go through Git LFS (`.gitattributes`).
