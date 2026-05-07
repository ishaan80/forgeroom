# ForgeRoom

ForgeRoom is a static web product for refining early product ideas. It combines two working habits:

- GStack-style stages: Think, Grill, Plan, Build, Review, Test, Ship.
- Grill Me-style interrogation: one question at a time, with a recommended answer shape for each answer.

It runs without a backend, package install, database, account system, or build step.

## Run Locally

Open `index.html` in a browser.

For a local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Host It

Upload these files to any static host:

- `index.html`
- `styles.css`
- `app.js`

Good low-effort options:

- GitHub Pages
- Netlify static deploy
- Vercel static project
- Any VPS or shared host serving this folder

## Product Behavior

The app walks the user through 21 questions across seven stages. Every prompt includes:

- The current stage and thinking mode.
- A hard question designed to sharpen the idea.
- Why the question matters.
- A recommended answer shape.
- A live brief that updates as the user answers.
- An exportable markdown product brief.

Answers are stored in `localStorage`, so users can refresh and continue on the same browser.
