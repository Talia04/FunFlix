"use client";

import { useMemo, useState } from "react";
import { Blobert } from "@/components/Blobert/Blobert";
import { BlobertParticles } from "@/components/Blobert/BlobertParticles";
import { DigestTrail } from "@/components/animations/DigestTrail";
import { FlyingInput } from "@/components/animations/FlyingInput";
import { JudgmentBurp } from "@/components/animations/JudgmentBurp";
import { digestLines } from "@/data/roasts";
import { signupFields } from "@/data/fieldRules";
import { createJudgment, maskPassword } from "@/lib/scoring";
import { validateField } from "@/lib/validation";
import type {
  AnimationStage,
  BlobertMood,
  Judgment,
  SignupFieldId,
  SignupValues,
} from "@/types/blobert";
import { FinalResult } from "./FinalResult";
import { JudgmentCard } from "./JudgmentCard";
import { MouthInput } from "./MouthInput";
import { ProgressSteps } from "./ProgressSteps";

const stageCopy: Record<AnimationStage, string> = {
  idle: "Feed me your username.",
  typing: "Yes. Put the data right there.",
  swallowing: "Incoming snack.",
  chewing: "Chomp chomp. I am considering your choices.",
  digesting: "Digesting your choices...",
  judging: "I have thoughts.",
  transitioning: "Next bite.",
  finalizing: "Compiling your digital personality...",
  complete: "Against my better judgment... welcome.",
};

export function SignupController() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState("");
  const [values, setValues] = useState<SignupValues>({});
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<AnimationStage>("idle");
  const [mood, setMood] = useState<BlobertMood>("hungry");
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [flyingText, setFlyingText] = useState("");
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  const currentField = signupFields[currentIndex];
  const completed = judgments.map((judgment) => judgment.fieldId);
  const isComplete = currentIndex >= signupFields.length;
  const digestLine = digestLines[(currentIndex + value.length) % digestLines.length];
  const latestJudgment = judgments[judgments.length - 1];

  const speech = useMemo(() => {
    if (isComplete) {
      return stageCopy.complete;
    }

    if (error) {
      return error;
    }

    if (stage === "idle") {
      return currentField.prompt;
    }

    return stage === "digesting" ? digestLine : stageCopy[stage];
  }, [currentField?.prompt, digestLine, error, isComplete, stage]);

  function handleChange(nextValue: string) {
    setValue(nextValue);
    setError(null);
    setStage(nextValue ? "typing" : "idle");
    setMood(getTypingMood(nextValue, currentField?.id));
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setGaze({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  }

  function handleSubmit() {
    if (!currentField || stage === "swallowing" || stage === "chewing" || stage === "digesting") {
      return;
    }

    const validationError = validateField(currentField.id, value, values);

    if (validationError) {
      setError(validationError);
      setMood("disgusted");
      setStage("judging");
      return;
    }

    const nextValues = { ...values, [currentField.id]: value };
    const judgment = createJudgment(currentField, value, nextValues);
    const displayValue = currentField.id === "password" || currentField.id === "confirmPassword" ? maskPassword(value) : value;

    setValues(nextValues);
    setFlyingText(displayValue);
    setStage("swallowing");
    setMood("hungry");

    window.setTimeout(() => {
      setStage("chewing");
    }, 650);

    window.setTimeout(() => {
      setStage("digesting");
      setMood("digesting");
    }, 1250);

    window.setTimeout(() => {
      setJudgments((items) => [...items, judgment]);
      setMood(judgment.mood);
      setStage("judging");
      setFlyingText("");
    }, 2100);

    window.setTimeout(() => {
      setValue("");
      setError(null);

      if (currentIndex + 1 >= signupFields.length) {
        setCurrentIndex(signupFields.length);
        setStage("complete");
        setMood("reluctant");
      } else {
        setCurrentIndex((index) => index + 1);
        setStage("idle");
        setMood("hungry");
      }
    }, 3100);
  }

  function handleReset() {
    setCurrentIndex(0);
    setValue("");
    setValues({});
    setError(null);
    setStage("idle");
    setMood("hungry");
    setJudgments([]);
    setFlyingText("");
    setGaze({ x: 0, y: 0 });
  }

  return (
    <section className="grid w-full items-center gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
      <div className="relative mx-auto w-full max-w-[590px]">
        <BlobertParticles />
        <div className="relative z-10 mb-3 rounded-[28px] border-4 border-white bg-white/95 px-5 py-4 text-center text-base font-black text-ink shadow-xl sm:text-xl">
          {speech}
          <span className="absolute bottom-[-14px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 border-b-4 border-r-4 border-white bg-white" />
        </div>
        <div
          className="relative"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setGaze({ x: 0, y: 0 })}
        >
          <Blobert mood={mood} stage={stage} activeField={currentField?.id} gaze={gaze}>
            {!isComplete && currentField ? (
              <MouthInput
                field={currentField}
                value={value}
                error={error}
                disabled={stage === "swallowing" || stage === "chewing" || stage === "digesting"}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            ) : null}
          </Blobert>
          {stage === "digesting" ? <DigestTrail /> : null}
          {stage === "swallowing" ? <FlyingInput text={flyingText} /> : null}
          {stage === "judging" && latestJudgment ? (
            <JudgmentBurp key={`${latestJudgment.fieldId}-${latestJudgment.displayValue}`} message={latestJudgment.message} />
          ) : null}
        </div>
        <ProgressSteps currentFieldId={currentField?.id} completed={completed as SignupFieldId[]} />
      </div>

      <aside className="mx-auto flex w-full max-w-[420px] flex-col gap-3 lg:mx-0">
        {isComplete ? <FinalResult judgments={judgments} onReset={handleReset} /> : null}
        <div className="grid gap-3">
          {judgments
            .slice()
            .reverse()
            .map((judgment) => (
              <JudgmentCard key={`${judgment.fieldId}-${judgment.displayValue}`} judgment={judgment} />
            ))}
        </div>
      </aside>
    </section>
  );
}

function getTypingMood(value: string, fieldId?: SignupFieldId): BlobertMood {
  if (!value) {
    return "hungry";
  }

  if (fieldId === "password" && value.length < 6) {
    return "suspicious";
  }

  if (fieldId === "username" && /^(.)\1+$/.test(value)) {
    return "disgusted";
  }

  if (fieldId === "email" && !value.includes("@")) {
    return "suspicious";
  }

  return "curious";
}
