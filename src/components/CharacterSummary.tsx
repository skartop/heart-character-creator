import type { CharacterDraft, CharacterOption, CharacterQuestion } from "@/lib/character-schema";

type CharacterSummaryProps = {
  character: CharacterDraft;
  ancestry?: CharacterOption;
  calling?: CharacterOption;
  characterClass?: CharacterOption;
  questions: CharacterQuestion[];
};

export default function CharacterSummary({ character, ancestry, calling, characterClass, questions }: CharacterSummaryProps) {
  const deferredQuestions = questions.filter((question) => character.deferredQuestionIds.includes(question.id));

  return (
    <aside className="rounded-2xl border border-heart-brass/20 bg-black/30 p-5">
      <h2 className="text-xl font-semibold">Character Summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-heart-bone/50">Name</dt>
          <dd>{character.name || "Not set"}</dd>
        </div>
        <div>
          <dt className="text-heart-bone/50">Concept</dt>
          <dd>{character.concept || "Not set"}</dd>
        </div>
        <div>
          <dt className="text-heart-bone/50">Ancestry</dt>
          <dd>{ancestry?.name ?? "Not selected"}</dd>
        </div>
        <div>
          <dt className="text-heart-bone/50">Calling</dt>
          <dd>{calling?.name ?? "Not selected"}</dd>
        </div>
        <div>
          <dt className="text-heart-bone/50">Class</dt>
          <dd>{characterClass?.name ?? "Not selected"}</dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-heart-brass/20 pt-4">
        <h3 className="font-semibold">Deferred Questions</h3>
        {deferredQuestions.length === 0 ? (
          <p className="mt-2 text-sm text-heart-bone/60">None.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-heart-bone/70">
            {deferredQuestions.map((question) => (
              <li key={question.id}>{question.prompt}</li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
