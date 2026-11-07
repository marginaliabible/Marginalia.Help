# Marginalia.Help

Public help content for [Marginalia](https://github.com/marginaliabible/Marginalia.UI): markdown articles, a generated search index, and React Joyride tour step JSON.

Marginalia.UI loads these files asynchronously over CDN (jsDelivr / raw.githubusercontent). Do not bundle this content into the UI repo.

## Layout

| Path | Role |
|------|------|
| `manifest.json` | Article TOC + tour index |
| `search-index.json` | Generated MiniSearch documents (do not hand-edit) |
| `articles/*.md` | Help articles |
| `tours/*.json` | Guided-tour step definitions |
| `scripts/build-search-index.mjs` | Regenerates `search-index.json` |

## Authoring

1. Add or edit markdown under `articles/` and list it in `manifest.json`.
2. For “Show me how” links in markdown, use `tour:<tour-id>` (e.g. `[Show me how](tour:open-settings)`).
3. To jump to the first tour step for a UI target, use `target:<target-id>` or `target:<tour-id>.<target-id>` (e.g. `[cards](target:translations-selected)`). The UI opens whatever host surface that step needs (Translations panel, Settings, etc.).
4. Regenerate the search index:

```bash
npm run build:index
```

5. Commit both the article changes and the updated `search-index.json`.

Tour JSON uses logical target ids (e.g. `settings-button`). The UI maps those to `[data-help="..."]` attributes.

## CDN

Example base URL used by the UI:

`https://raw.githubusercontent.com/marginaliabible/Marginalia.Help/main/`
