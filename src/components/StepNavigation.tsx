import type { BuilderStep } from "@/lib/character-schema";

const labels: Record<BuilderStep, string> = {
  ancestry: "Ancestry",
  calling: "Calling",
  class: "Class",
  questions: "Questions",
  review: "Review"
};

type StepNavigationProps = {
  steps: BuilderStep[];
  currentStep: BuilderStep;
  onStepChange: (step: BuilderStep) => void;
};

export default function StepNavigation({ steps, currentStep, onStepChange }: StepNavigationProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {steps.map((step) => (
        <button
          key={step}
          type="button"
          onClick={() => onStepChange(step)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            currentStep === step ? "bg-heart-ember text-white" : "bg-black/30 text-heart-bone/70 hover:text-heart-bone"
          }`}
        >
          {labels[step]}
        </button>
      ))}
    </nav>
  );
}
