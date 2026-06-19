export type BlobertMood =
  | "idle"
  | "hungry"
  | "curious"
  | "suspicious"
  | "judging"
  | "disgusted"
  | "impressed"
  | "digesting"
  | "overloaded"
  | "approving"
  | "reluctant";

export type SignupFieldId = "username" | "email" | "password" | "confirmPassword";

export type AnimationStage =
  | "idle"
  | "typing"
  | "swallowing"
  | "chewing"
  | "digesting"
  | "judging"
  | "transitioning"
  | "finalizing"
  | "complete";

export type SignupField = {
  id: SignupFieldId;
  label: string;
  inputType: "text" | "email" | "password";
  prompt: string;
  placeholder: string;
};

export type Judgment = {
  fieldId: SignupFieldId;
  fieldLabel: string;
  displayValue: string;
  score: number;
  message: string;
  mood: BlobertMood;
};

export type SignupValues = Partial<Record<SignupFieldId, string>>;
