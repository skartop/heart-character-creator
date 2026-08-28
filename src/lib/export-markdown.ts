import type { CharacterDraft, CharacterOption, CharacterQuestion } from "./character-schema";

type ExportInputs = {
  character: CharacterDraft;
  ancestry?: CharacterOption;
  calling?: CharacterOption;
  characterClass?: CharacterOption;
  questions: CharacterQuestion[];
};

export function exportCharacterMarkdown({ character, ancestry, calling, characterClass, questions }: ExportInputs) {
  const lines = [
    `# ${character.name || "Unnamed Character"}`,
    "",
    `**Concept:** ${character.concept || "Not set"}`,
    `**Ancestry:** ${ancestry?.name ?? "Not selected"}`,
    `**Calling:** ${calling?.name ?? "Not selected"}`,
    `**Class:** ${characterClass?.name ?? "Not selected"}`,
    "",
    "## Character Questions",
    ""
  ];

  for (const question of questions) {
    const deferred = character.deferredQuestionIds.includes(question.id);
    lines.push(`### ${question.prompt}`);
    lines.push(deferred ? "Deferred until party context is known." : character.answers[question.id] || "Not answered.");
    lines.push("");
  }

  lines.push("## Unresolved Items");
  lines.push("");

  const unresolved = questions.filter((question) => character.deferredQuestionIds.includes(question.id));

  if (unresolved.length === 0) {
    lines.push("None.");
  } else {
    for (const question of unresolved) {
      lines.push(`- ${question.prompt}`);
    }
  }

  return lines.join("\n");
}
