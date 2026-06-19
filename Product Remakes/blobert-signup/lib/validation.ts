import type { SignupFieldId, SignupValues } from "@/types/blobert";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(
  fieldId: SignupFieldId,
  value: string,
  values: SignupValues,
) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Blobert cannot digest empty air.";
  }

  if (fieldId === "username" && trimmed.length < 3) {
    return "That username is too tiny to chew.";
  }

  if (fieldId === "email" && !emailPattern.test(trimmed)) {
    return "That is not an email. That is punctuation soup.";
  }

  if (fieldId === "password" && value.length < 6) {
    return "Six characters minimum. Blobert has standards today.";
  }

  if (fieldId === "confirmPassword" && value !== values.password) {
    return "Even your passwords are arguing.";
  }

  return null;
}
