export type BuilderStep = "ancestry" | "calling" | "class" | "questions" | "review";

export type CharacterOption = {
  id: string;
  name: string;
  summary: string;
  themes: string[];
  recommendationNotes?: string[];
};

export type CharacterQuestion = {
  id: string;
  prompt: string;
  reason: string;
  canDefer: boolean;
};

export type CharacterDraft = {
  name: string;
  concept: string;
  ancestryId?: string;
  callingId?: string;
  classId?: string;
  answers: Record<string, string>;
  deferredQuestionIds: string[];
};

export const builderSteps: BuilderStep[] = ["ancestry", "calling", "class", "questions", "review"];

export const emptyCharacterDraft: CharacterDraft = {
  name: "",
  concept: "",
  answers: {},
  deferredQuestionIds: []
};
