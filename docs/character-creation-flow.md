# Character Creation Flow

## Current MVP Flow

```text
Start
↓
Capture name and concept
↓
Choose ancestry
↓
Choose calling
↓
Choose class concept
↓
Answer or defer character questions
↓
Review summary
↓
Export Markdown
```

## Design Principle

The app should behave like a guided conversation, not a rules encyclopedia. Each step should explain what the choice means narratively, why it may fit the concept, and what remains unresolved.

## Deferred Question Handling

Some character questions depend on the rest of the party. The app should let players defer these answers and surface them clearly in the final review.

Examples:

- Why do you trust another character?
- What group connection binds you to the party?
- What secret should another player know?

## Recommendation Logic

Initial recommendations can be based on shared tags:

- technology
- faith
- survival
- secrets
- exploration
- research
- community

Later, this can become a richer scoring system or AI-assisted helper.
