import type { BlobertMood, Judgment, SignupField, SignupValues } from "@/types/blobert";

export function maskPassword(value: string) {
  return value.length ? "*".repeat(Math.min(value.length, 12)) : "";
}

export function createJudgment(
  field: SignupField,
  rawValue: string,
  values: SignupValues,
): Judgment {
  const value = rawValue.trim();

  if (field.id === "username") {
    const hasNumbersAtEnd = /\d+$/.test(value);
    const isBasic = /^(user|admin|test|tanya|blob)$/i.test(value);
    const isLongEnough = value.length >= 8;
    const score = Math.max(
      3,
      Math.min(9, 5 + (isLongEnough ? 2 : 0) - (hasNumbersAtEnd ? 1 : 0) - (isBasic ? 2 : 0)),
    );

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: value,
      score,
      mood: score >= 7 ? "impressed" : "judging",
      message: hasNumbersAtEnd
        ? "Very 2013. Were all the good names taken?"
        : score >= 7
          ? "Fine. This one has a pulse."
          : "You had the whole internet and chose that?",
    };
  }

  if (field.id === "email") {
    const domain = value.split("@")[1]?.toLowerCase() ?? "";
    const isWorkish = !["gmail.com", "yahoo.com", "outlook.com", "icloud.com"].includes(domain);
    const score = isWorkish ? 7 : 5;

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: value,
      score,
      mood: isWorkish ? "suspicious" : "curious",
      message: isWorkish ? "Corporate hostage situation detected." : "Basic, but functional.",
    };
  }

  if (field.id === "password") {
    const hasUpper = /[A-Z]/.test(rawValue);
    const hasNumber = /\d/.test(rawValue);
    const hasSymbol = /[^A-Za-z0-9]/.test(rawValue);
    const score = Math.min(10, 4 + (rawValue.length >= 10 ? 2 : 0) + Number(hasUpper) + Number(hasNumber) + Number(hasSymbol));
    const mood: BlobertMood = score >= 8 ? "impressed" : "disgusted";

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: maskPassword(rawValue),
      score,
      mood,
      message: score >= 8 ? "Okay wait... you cooked." : "A toddler could brute force this.",
    };
  }

  return {
    fieldId: field.id,
    fieldLabel: field.label,
    displayValue: maskPassword(rawValue),
    score: rawValue === values.password ? 8 : 1,
    mood: rawValue === values.password ? "approving" : "overloaded",
    message: rawValue === values.password ? "Character development." : "Almost. Unfortunately, almost is not security.",
  };
}

export function getFinalVerdict(judgments: Judgment[]) {
  const average = judgments.reduce((total, item) => total + item.score, 0) / judgments.length;

  if (average >= 8) {
    return {
      title: "Approved, but I'm watching you",
      vibe: "Suspiciously competent",
      message: "I hate that this is actually fine.",
    };
  }

  if (average >= 6) {
    return {
      title: "Reluctantly Approved",
      vibe: "Chronically online but harmless",
      message: "I've seen worse. Unfortunately.",
    };
  }

  return {
    title: "Fine. You may enter.",
    vibe: "Technically passable",
    message: "Account created. Standards lowered.",
  };
}
