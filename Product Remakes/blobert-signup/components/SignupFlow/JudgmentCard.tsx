import type { Judgment } from "@/types/blobert";

type JudgmentCardProps = {
  judgment: Judgment;
};

const severityClasses: Record<Judgment["severity"], string> = {
  good: "bg-lime text-ink",
  neutral: "bg-[#ffe66d] text-ink",
  bad: "bg-[#ff9f43] text-ink",
  horrific: "bg-[#ff5b6e] text-white",
};

export function JudgmentCard({ judgment }: JudgmentCardProps) {
  return (
    <article className="rounded-lg border-2 border-white/50 bg-white/90 p-4 text-ink shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-grape">
            {judgment.fieldLabel}
          </p>
          <p className="mt-1 break-all text-sm font-black">{judgment.displayValue}</p>
        </div>
        <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-sm font-black text-white">
          {judgment.score}/10
        </span>
      </div>
      <p className="mt-3 text-sm font-bold leading-snug">{judgment.message}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-wide ${severityClasses[judgment.severity]}`}>
          {judgment.severity}
        </span>
        <span className="text-xs font-black text-ink/65">{judgment.detail}</span>
      </div>
    </article>
  );
}
