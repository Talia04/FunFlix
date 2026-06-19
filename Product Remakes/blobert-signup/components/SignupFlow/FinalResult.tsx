import { getFinalVerdict } from "@/lib/scoring";
import type { Judgment } from "@/types/blobert";

type FinalResultProps = {
  judgments: Judgment[];
  onReset: () => void;
};

export function FinalResult({ judgments, onReset }: FinalResultProps) {
  const verdict = getFinalVerdict(judgments);

  return (
    <section className="rounded-lg border-4 border-white bg-white/95 p-5 text-center text-ink shadow-2xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-grape">Final result</p>
      <h2 className="mt-2 text-3xl font-black">{verdict.title}</h2>
      <p className="mt-2 text-sm font-black text-gum">Overall vibe: {verdict.vibe}</p>
      <p className="mt-3 text-base font-bold">{verdict.message}</p>
      <button
        className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105"
        type="button"
        onClick={onReset}
      >
        Feed him again
      </button>
    </section>
  );
}
