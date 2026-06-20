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
      <dl className="mt-5 grid grid-cols-1 gap-2 text-left text-sm font-bold sm:grid-cols-2">
        <div className="rounded-md bg-grape/10 p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-wide text-grape">Average</dt>
          <dd>{verdict.average.toFixed(1)}/10</dd>
        </div>
        <div className="rounded-md bg-grape/10 p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-wide text-grape">Username</dt>
          <dd>{verdict.usernameScore}/10</dd>
        </div>
        <div className="rounded-md bg-grape/10 p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-wide text-grape">Email vibe</dt>
          <dd>{verdict.emailVibe}</dd>
        </div>
        <div className="rounded-md bg-grape/10 p-3">
          <dt className="text-[0.68rem] font-black uppercase tracking-wide text-grape">Password</dt>
          <dd>{verdict.passwordRating}</dd>
        </div>
      </dl>
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
