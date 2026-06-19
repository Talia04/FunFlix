import type { SignupFieldId } from "@/types/blobert";
import { signupFields } from "@/data/fieldRules";

type ProgressStepsProps = {
  currentFieldId?: SignupFieldId;
  completed: SignupFieldId[];
};

export function ProgressSteps({ currentFieldId, completed }: ProgressStepsProps) {
  return (
    <ol className="grid w-full grid-cols-4 gap-2">
      {signupFields.map((field, index) => {
        const isDone = completed.includes(field.id);
        const isCurrent = currentFieldId === field.id;

        return (
          <li
            key={field.id}
            className={`rounded-full px-2 py-2 text-center text-[0.68rem] font-black uppercase tracking-wide transition sm:text-xs ${
              isDone
                ? "bg-lime text-ink"
                : isCurrent
                  ? "bg-white text-grape shadow-lg"
                  : "bg-white/30 text-white"
            }`}
          >
            {index + 1}. {field.label}
          </li>
        );
      })}
    </ol>
  );
}
