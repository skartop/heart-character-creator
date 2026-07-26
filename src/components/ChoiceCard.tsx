import type { CharacterOption } from "@/lib/character-schema";

type ChoiceCardProps = {
  option: CharacterOption;
  selected: boolean;
  onSelect: () => void;
};

export default function ChoiceCard({ option, selected, onSelect }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected ? "border-heart-brass bg-heart-brass/20" : "border-heart-brass/20 bg-black/20 hover:border-heart-brass/60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-heart-bone">{option.name}</h3>
          <p className="mt-2 text-sm text-heart-bone/75">{option.summary}</p>
        </div>
        {selected ? <span className="rounded-full bg-heart-ember px-3 py-1 text-xs font-semibold text-white">Selected</span> : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {option.themes.map((theme) => (
          <span key={theme} className="rounded-full border border-heart-brass/30 px-2 py-1 text-xs text-heart-bone/70">
            {theme}
          </span>
        ))}
      </div>

      {option.recommendationNotes?.length ? (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-heart-bone/70">
          {option.recommendationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}
