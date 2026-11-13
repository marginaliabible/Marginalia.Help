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
4. Inline HTML is allowed in articles (via `rehype-raw` in the UI). Prefer small trusted snippets such as Font Awesome icons already used in the app, e.g. `<i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>`.
5. Regenerate the search index:

```bash
npm run build:index
```

6. Commit both the article changes and the updated `search-index.json`.

## Tours

Tour JSON uses logical target ids (e.g. `settings-button`). The UI maps those to `[data-help="..."]` attributes.

Each step can include:

| Field | Role |
|-------|------|
| `target` | Tooltip anchor (required) |
| `spotlightTarget` | Optional wider spotlight when it should differ from `target` |
| `placement` | Joyride placement (`top`, `left`, `bottom`, …) |
| `before` | Host action run before the step (open Settings, ensure a panel tab, …) |
| `advanceVisible` | Gate: wait until a logical target is visible, then auto-advance |
| `advanceEvent` | Gate: wait until a named host event fires, then auto-advance |

### `advanceVisible`

Use when the next step needs UI that does not exist yet until the user does something—opening a tab, revealing a dropdown, submitting a search that mounts results, and so on.

While the gate is active, Next/Done is hidden. When the named target becomes visible in the DOM, the tour advances automatically.

```json
{
  "target": "search-input",
  "title": "Search Scripture",
  "content": "Type a word or phrase, then press Enter. When the Search results tab opens, the tour continues.",
  "advanceVisible": "search-results"
}
```

Pick a target that is **absent or hidden until the user completes the action**. Do not gate on something that is already on screen (for example a selected verse that is usually present).

### `advanceEvent`

Use when visibility is not a reliable signal—the element is already there, or nothing new appears in the DOM when the user finishes the action.

While the gate is active, Next/Done is hidden. When the UI emits that event name, the tour advances automatically.

```json
{
  "target": "search-input",
  "title": "Quick jump to a verse",
  "content": "Type John 3:16, then press Enter or click the search icon.",
  "advanceEvent": "search-quick-jump"
}
```

Event names are defined in Marginalia.UI (`emitHelpTourEvent`). Currently:

| Event | Fired when |
|-------|------------|
| `search-quick-jump` | The user jumps to a verse from the search box (Enter, search icon, or the jump preview) |

New events need a matching `emitHelpTourEvent('…')` call in the UI before a tour can wait on them.

Tour step `content` may include markdown-style Help article links: `[Account Sync](account-sync)`.

### Tour prerequisites (`resources-panel`)

Some tours run quiet host checks before the first step. The `resources-panel` tour:

1. Requires at least one linked cloud provider (Google Drive or OneDrive). If none, it shows a blocking message with a link to `account-sync`.
2. Requires a chapter with at least one non-empty resource donut. If the current chapter has none, the host navigates to the first chapter that does. If no resources exist at all, it shows a blocking message linking to `account-sync`.

When both checks pass, the tour starts with no extra prompts.

## CDN

Example base URL used by the UI:

`https://raw.githubusercontent.com/marginaliabible/Marginalia.Help/main/`
