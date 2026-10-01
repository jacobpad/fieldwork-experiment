# Fieldwork

A privacy-first, static educational decision aid for choosing one realistic small business experiment. Authored presentation of project 0005, with updated readiness rules and skills preparation. Version 1.1 uses unvalidated heuristics, not personality assessment, ability certification, market validation or earnings prediction.

## Local use

Requires Node.js for tests and Python 3 for the preview server. No runtime dependencies or build step.

```sh
npm test
npm start
```

Open http://localhost:4173. Deploy the repository root through GitHub Pages.

## Rules and privacy

Eight preference questions contribute one point each. Every route within one point of the highest score remains a close match. Fewer than four substantive answers means exploration first. Paid readiness is separate: time, response windows, skill, support, a shareable sample and buyer access shape preparation. A blocked preferred route remains visible. No zero-point alternate is recommended.

Answers and worksheet notes remain in tab memory and are cleared by reload or restart. No analytics, storage, tracking or answer transmission. Text downloads and browser printing are user-initiated. GitHub Pages may retain ordinary hosting logs.

Only authored publishable app content belongs in this repository. Source kit, private planning documents and source conversation records are excluded. The public demo has no checkout or course resale offer.

## Media

Two 20-second Runway-derived commercials: `assets/fieldwork-start.mp4` and `assets/fieldwork-test.mp4`, with English WebVTT captions and text transcripts. Playback and audio are user-initiated.

## Validation

`tests/engine.test.js` covers missing inputs, ties, exploration, skill and support gating, buyer access, urgency and 960 exhaustive practical-constraint combinations. Browser QA covers responsive layouts, keyboard use, back/edit/restart, plan downloads and media playback. See release verification notes for final evidence.
