# Heart Character Creator

A guided character creation web app for building characters for *Heart: The City Beneath*.

This project is intended to help players move through character creation one step at a time, with prompts, recommendations, unresolved-question tracking, and exportable character summaries.

## MVP Goals

- Step-by-step character builder
- Save/load character progress in the browser
- Copyright-safe data structure using summaries and page-reference-friendly placeholders
- Recommendation notes based on concept tags
- Unresolved questions tracker
- Markdown export for table use

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Local browser storage for MVP persistence
- JSON data files for character options

## Content and Licensing Note

This repository should avoid reproducing large portions of official rulebook text. Use original summaries, references, and private table notes where appropriate. For any public release, review the publisher's licensing and fan-content policy first.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local development URL shown by Next.js.

## Current Status

Initial scaffold only. The app includes a working character builder shell with sample ancestry, calling, class, and question data.
