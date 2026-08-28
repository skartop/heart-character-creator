"use client";

import { useEffect, useMemo, useState } from "react";
import ancestryData from "@/data/ancestries.json";
import callingData from "@/data/callings.json";
import classData from "@/data/classes.json";
import questionData from "@/data/questions.json";
import { builderSteps, emptyCharacterDraft, type BuilderStep, type CharacterDraft, type CharacterOption, type CharacterQuestion } from "@/lib/character-schema";
import { exportCharacterMarkdown } from "@/lib/export-markdown";
import CharacterSummary from "./CharacterSummary";
import ChoiceCard from "./ChoiceCard";
import StepNavigation from "./StepNavigation";

const STORAGE_KEY = "heart-character-draft";

const ancestries = ancestryData as CharacterOption[];
const callings = callingData as CharacterOption[];
const characterClasses = classData as CharacterOption[];
const questions = questionData as CharacterQuestion[];

export default function CharacterBuilder() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>("ancestry");
  const [character, setCharacter] = useState<CharacterDraft>(emptyCharacterDraft);
  const [exportedMarkdown, setExportedMarkdown] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCharacter(JSON.parse(saved) as CharacterDraft);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  const selectedAncestry = useMemo(() => ancestries.find((option) => option.id === character.ancestryId), [character.ancestryId]);
  const selectedCalling = useMemo(() => callings.find((option) => option.id === character.callingId), [character.callingId]);
  const selectedClass = useMemo(() => characterClasses.find((option) => option.id === character.classId), [character.classId]);

  function updateCharacter(partial: Partial<CharacterDraft>) {
    setCharacter((current) => ({ ...current, ...partial }));
  }

  function toggleDeferred(questionId: string) {
    setCharacter((current) => {
      const isDeferred = current.deferredQuestionIds.includes(questionId);
      return {
        ...current,
        deferredQuestionIds: isDeferred
          ? current.deferredQuestionIds.filter((id) => id !== questionId)
          : [...current.deferredQuestionIds, questionId]
      };
    });
  }

  function updateAnswer(questionId: string, answer: string) {
    setCharacter((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [questionId]: answer
      }
    }));
  }

  function nextStep() {
    const index = builderSteps.indexOf(currentStep);
    setCurrentStep(builderSteps[Math.min(index + 1, builderSteps.length - 1)]);
  }

  function previousStep() {
    const index = builderSteps.indexOf(currentStep);
    setCurrentStep(builderSteps[Math.max(index - 1, 0)]);
  }

  function resetCharacter() {
    setCharacter(emptyCharacterDraft);
    setExportedMarkdown("");
  }

  function handleExport() {
    setExportedMarkdown(
      exportCharacterMarkdown({
        character,
        ancestry: selectedAncestry,
        calling: selectedCalling,
        characterClass: selectedClass,
        questions
      })
    );
  }

  return (
    <main className="min-h-screen bg-heart-ink px-6 py-10 text-heart-bone">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-heart-brass">Guided Builder</p>
            <h1 className="text-3xl font-bold md:text-5xl">Character creation walkthrough</h1>
            <p className="max-w-3xl text-heart-bone/75">
              Make one choice at a time. The app saves progress locally and supports deferred questions for answers that depend on the rest of the party.
            </p>
          </div>

          <StepNavigation steps={builderSteps} currentStep={currentStep} onStepChange={setCurrentStep} />

          <div className="rounded-2xl border border-heart-brass/20 bg-black/20 p-5">
            {currentStep === "ancestry" ? (
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="text-heart-bone/70">Character name</span>
                    <input
                      value={character.name}
                      onChange={(event) => updateCharacter({ name: event.target.value })}
                      className="w-full rounded-lg border border-heart-brass/30 bg-black/30 px-3 py-2 outline-none focus:border-heart-brass"
                      placeholder="Name can come later"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-heart-bone/70">Concept</span>
                    <input
                      value={character.concept}
                      onChange={(event) => updateCharacter({ concept: event.target.value })}
                      className="w-full rounded-lg border border-heart-brass/30 bg-black/30 px-3 py-2 outline-none focus:border-heart-brass"
                      placeholder="Tech scavenger seeking a hidden timetable"
                    />
                  </label>
                </div>

                <h2 className="text-2xl font-semibold">Choose ancestry</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {ancestries.map((option) => (
                    <ChoiceCard key={option.id} option={option} selected={character.ancestryId === option.id} onSelect={() => updateCharacter({ ancestryId: option.id })} />
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === "calling" ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Choose calling</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {callings.map((option) => (
                    <ChoiceCard key={option.id} option={option} selected={character.callingId === option.id} onSelect={() => updateCharacter({ callingId: option.id })} />
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === "class" ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Choose class concept</h2>
                <p className="text-sm text-heart-bone/65">These are copyright-safe placeholders. Replace them with your own summaries and references for private table use.</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {characterClasses.map((option) => (
                    <ChoiceCard key={option.id} option={option} selected={character.classId === option.id} onSelect={() => updateCharacter({ classId: option.id })} />
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === "questions" ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Answer character questions</h2>
                <div className="space-y-4">
                  {questions.map((question) => {
                    const deferred = character.deferredQuestionIds.includes(question.id);
                    return (
                      <div key={question.id} className="rounded-xl border border-heart-brass/20 bg-black/20 p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="font-semibold">{question.prompt}</h3>
                            <p className="mt-1 text-sm text-heart-bone/60">{question.reason}</p>
                          </div>
                          {question.canDefer ? (
                            <button type="button" onClick={() => toggleDeferred(question.id)} className="rounded-lg border border-heart-brass/30 px-3 py-2 text-sm">
                              {deferred ? "Mark active" : "Defer"}
                            </button>
                          ) : null}
                        </div>
                        <textarea
                          value={character.answers[question.id] ?? ""}
                          onChange={(event) => updateAnswer(question.id, event.target.value)}
                          disabled={deferred}
                          className="mt-4 min-h-28 w-full rounded-lg border border-heart-brass/30 bg-black/30 px-3 py-2 outline-none focus:border-heart-brass disabled:opacity-40"
                          placeholder={deferred ? "Deferred until party context is known." : "Write an answer..."}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {currentStep === "review" ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold">Review and export</h2>
                <p className="text-sm text-heart-bone/65">Export generates a Markdown summary you can paste into notes, Discord, a VTT, or a character document.</p>
                <button type="button" onClick={handleExport} className="rounded-lg bg-heart-ember px-4 py-2 font-semibold text-white">
                  Generate Markdown
                </button>
                {exportedMarkdown ? (
                  <textarea readOnly value={exportedMarkdown} className="min-h-96 w-full rounded-xl border border-heart-brass/30 bg-black/40 p-4 font-mono text-sm" />
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={previousStep} className="rounded-lg border border-heart-brass/30 px-4 py-2 font-semibold">
              Back
            </button>
            <button type="button" onClick={nextStep} className="rounded-lg bg-heart-ember px-4 py-2 font-semibold text-white">
              Next
            </button>
            <button type="button" onClick={resetCharacter} className="rounded-lg border border-red-400/40 px-4 py-2 font-semibold text-red-200">
              Reset
            </button>
          </div>
        </section>

        <CharacterSummary character={character} ancestry={selectedAncestry} calling={selectedCalling} characterClass={selectedClass} questions={questions} />
      </div>
    </main>
  );
}
