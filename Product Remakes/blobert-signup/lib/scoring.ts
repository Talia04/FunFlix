import type { BlobertMood, Judgment, SignupField, SignupValues } from "@/types/blobert";
import {
  confirmPasswordRoasts,
  emailRoasts,
  finalComments,
  passwordRoasts,
  usernameRoasts,
} from "@/data/roasts";

export function maskPassword(value: string) {
  return value.length ? "*".repeat(Math.min(value.length, 12)) : "";
}

function pickLine(lines: string[], seed: string) {
  const total = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return lines[total % lines.length];
}

function severityFromScore(score: number): Judgment["severity"] {
  if (score >= 8) {
    return "good";
  }

  if (score >= 6) {
    return "neutral";
  }

  if (score >= 3) {
    return "bad";
  }

  return "horrific";
}

function passwordScore(rawValue: string) {
  const hasLower = /[a-z]/.test(rawValue);
  const hasUpper = /[A-Z]/.test(rawValue);
  const hasNumber = /\d/.test(rawValue);
  const hasSymbol = /[^A-Za-z0-9]/.test(rawValue);
  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  const lengthScore = rawValue.length >= 16 ? 4 : rawValue.length >= 12 ? 3 : rawValue.length >= 10 ? 2 : 1;
  const repeated = /(.)\1{2,}/.test(rawValue);
  const forbidden = /^(password|password123|qwerty|letmein|admin123|12345678)$/i.test(rawValue);

  if (forbidden) {
    return 1;
  }

  return Math.max(2, Math.min(10, lengthScore + variety + (rawValue.length >= 14 ? 1 : 0) - (repeated ? 1 : 0)));
}

function passwordRating(score: number) {
  if (score <= 2) {
    return "Embarrassing";
  }

  if (score <= 4) {
    return "Still weak";
  }

  if (score <= 6) {
    return "Trying";
  }

  if (score <= 8) {
    return "Okay fine";
  }

  return "Secure but annoying";
}

export function createJudgment(
  field: SignupField,
  rawValue: string,
  values: SignupValues,
): Judgment {
  const value = rawValue.trim();

  if (field.id === "username") {
    const hasNumbersAtEnd = /\d+$/.test(value);
    const isBasic = /^(user|admin|test|tanya|blob|guest|demo|coolguy|username)$/i.test(value);
    const hasOddShape = /[_-]{2,}|x{2,}|z{2,}|[^\w-]/i.test(value);
    const uniqueChars = new Set(value.toLowerCase()).size;
    const isLongEnough = value.length >= 8;
    const score = Math.max(
      1,
      Math.min(
        10,
        4 +
          (isLongEnough ? 2 : 0) +
          (uniqueChars >= 6 ? 1 : 0) +
          (hasOddShape ? 1 : 0) -
          (value.length < 4 ? 2 : 0) -
          (hasNumbersAtEnd ? 1 : 0) -
          (isBasic ? 2 : 0),
      ),
    );
    const message =
      value.length < 4
        ? pickLine(usernameRoasts.tooShort, value)
        : isBasic
          ? pickLine(usernameRoasts.basic, value)
          : hasNumbersAtEnd
            ? pickLine(usernameRoasts.numbersAtEnd, value)
            : hasOddShape
              ? pickLine(usernameRoasts.weird, value)
              : pickLine(usernameRoasts.good, value);

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: value,
      score,
      mood: score >= 7 ? "impressed" : "judging",
      severity: severityFromScore(score),
      detail: hasOddShape ? "Chaos level: memorable" : isBasic ? "Creativity: default settings" : "Creativity: usable",
      message,
    };
  }

  if (field.id === "email") {
    const domain = value.split("@")[1]?.toLowerCase() ?? "";
    const isCommon = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"].includes(domain);
    const isSchool = /\.edu$/.test(domain) || domain.includes("school") || domain.includes("student");
    const isLong = value.length > 34;
    const isWorkish = !isCommon && !isSchool;
    const score = Math.max(4, Math.min(9, 5 + (isWorkish ? 2 : 0) + (isSchool ? 1 : 0) - (isLong ? 1 : 0)));
    const message = isLong
      ? pickLine(emailRoasts.long, value)
      : isSchool
        ? pickLine(emailRoasts.school, value)
        : isWorkish
          ? pickLine(emailRoasts.work, value)
          : pickLine(emailRoasts.common, value);

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: value,
      score,
      mood: isWorkish ? "suspicious" : "curious",
      severity: severityFromScore(score),
      detail: `Email vibe: ${isSchool ? "academic suffering" : isWorkish ? "work-coded" : "standard inbox"}`,
      message,
    };
  }

  if (field.id === "password") {
    const score = passwordScore(rawValue);
    const rating = passwordRating(score);
    const forbidden = /^(password|password123|qwerty|letmein|admin123|12345678)$/i.test(rawValue);
    const mood: BlobertMood = score >= 8 ? "impressed" : score >= 5 ? "suspicious" : "disgusted";
    const message = forbidden
      ? pickLine(passwordRoasts.forbidden, rawValue)
      : score >= 8
        ? pickLine(passwordRoasts.strong, rawValue)
        : score >= 5
          ? pickLine(passwordRoasts.medium, rawValue)
          : pickLine(passwordRoasts.weak, rawValue);

    return {
      fieldId: field.id,
      fieldLabel: field.label,
      displayValue: maskPassword(rawValue),
      score,
      mood,
      severity: severityFromScore(score),
      detail: `Password rating: ${rating}`,
      message,
    };
  }

  const matches = rawValue === values.password;
  const score = matches ? 8 : rawValue.length ? 2 : 1;

  return {
    fieldId: field.id,
    fieldLabel: field.label,
    displayValue: maskPassword(rawValue),
    score,
    mood: matches ? "approving" : "overloaded",
    severity: severityFromScore(score),
    detail: matches ? "Match status: emotionally aligned" : "Match status: relationship trouble",
    message: matches
      ? pickLine(confirmPasswordRoasts.match, rawValue)
      : rawValue.length
        ? pickLine(confirmPasswordRoasts.mismatch, rawValue)
        : pickLine(confirmPasswordRoasts.empty, rawValue),
  };
}

export function getFinalVerdict(judgments: Judgment[]) {
  const average = judgments.reduce((total, item) => total + item.score, 0) / judgments.length;
  const password = judgments.find((judgment) => judgment.fieldId === "password");
  const email = judgments.find((judgment) => judgment.fieldId === "email");
  const username = judgments.find((judgment) => judgment.fieldId === "username");

  if (average >= 8) {
    return {
      title: "Approved, but I'm watching you",
      vibe: "Suspiciously competent",
      message: pickLine(finalComments.strong, `${average}`),
      average,
      usernameScore: username?.score ?? 0,
      emailVibe: email?.detail.replace("Email vibe: ", "") ?? "unknown",
      passwordRating: password?.detail.replace("Password rating: ", "") ?? "unknown",
    };
  }

  if (average >= 6) {
    return {
      title: "Reluctantly Approved",
      vibe: "Chronically online but harmless",
      message: pickLine(finalComments.medium, `${average}`),
      average,
      usernameScore: username?.score ?? 0,
      emailVibe: email?.detail.replace("Email vibe: ", "") ?? "unknown",
      passwordRating: password?.detail.replace("Password rating: ", "") ?? "unknown",
    };
  }

  return {
    title: "Fine. You may enter.",
    vibe: "Technically passable",
    message: pickLine(finalComments.weak, `${average}`),
    average,
    usernameScore: username?.score ?? 0,
    emailVibe: email?.detail.replace("Email vibe: ", "") ?? "unknown",
    passwordRating: password?.detail.replace("Password rating: ", "") ?? "unknown",
  };
}
