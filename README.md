# ForgeRoom

ForgeRoom is an adaptive web product for refining early ideas. It combines:

- GStack office-hours: Startup and Builder modes, forcing questions, smart skipping, premise challenge, alternatives, and a design brief.
- Grill Me: one question at a time, relentless follow-up, and a recommended answer shape for every question.

The app has two modes of operation:

- Local fallback: works from `file://` or any static host with no API key. It uses built-in coaching logic.
- Adaptive AI coach: works when hosted with `/api/coach` and `OPENAI_API_KEY`. The key stays on the server.

## Run Locally

Static fallback:

```bash
open index.html
```

Full local server:

```bash
npm start
```

Then open `http://localhost:8787`.

Without `OPENAI_API_KEY`, the app automatically falls back to the local coach.

## Enable Adaptive AI

Set a server-side environment variable:

```bash
export OPENAI_API_KEY="sk-..."
```

Optional model override:

```bash
export OPENAI_MODEL="gpt-5.4-mini"
```

Then run:

```bash
npm start
```

## Deploy Simply

### Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add environment variable `OPENAI_API_KEY`.
4. Deploy.

Vercel will serve the static app and `/api/coach` serverless function.

### Static Only

Upload these files to any static host:

- `index.html`
- `styles.css`
- `app.js`

Static-only hosting still works, but it uses the local fallback coach instead of AI-generated follow-up questions.

## Product Behavior

The adaptive coach:

- Selects Startup or Builder mode.
- Asks one question at a time.
- Pushes for specificity when answers are vague.
- Smart-skips questions that are already answered.
- Generates pressure notes, premise challenge, alternatives, and a design brief.
- Exports a markdown brief in a GStack-style design-doc format.

Answers are stored in `localStorage`, so users can refresh and continue on the same browser.
