import type { SignupField } from "@/types/blobert";

export const signupFields: SignupField[] = [
  {
    id: "username",
    label: "Username",
    inputType: "text",
    prompt: "Feed me your username.",
    placeholder: "tanya123",
  },
  {
    id: "email",
    label: "Email",
    inputType: "email",
    prompt: "Now the email. Try to make it look legal.",
    placeholder: "you@example.com",
  },
  {
    id: "password",
    label: "Password",
    inputType: "password",
    prompt: "Password time. I promise to forget it immediately.",
    placeholder: "make it annoying",
  },
  {
    id: "confirmPassword",
    label: "Confirm password",
    inputType: "password",
    prompt: "Feed me the sequel.",
    placeholder: "same one again",
  },
];
