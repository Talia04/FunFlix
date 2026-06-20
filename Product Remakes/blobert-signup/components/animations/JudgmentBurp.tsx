"use client";

import { motion } from "framer-motion";

type JudgmentBurpProps = {
  message: string;
};

export function JudgmentBurp({ message }: JudgmentBurpProps) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[170px] z-40 w-[220px] -translate-x-1/2 rounded-2xl border-4 border-ink bg-white px-4 py-3 text-center text-sm font-black text-ink shadow-xl sm:top-[205px]"
      initial={{ opacity: 0, y: 45, scale: 0.45 }}
      animate={{ opacity: [0, 1, 1, 0], y: [45, -10, -32, -50], scale: [0.45, 1.08, 1, 0.9] }}
      transition={{ duration: 1.15, ease: "easeOut" }}
    >
      <span className="absolute -bottom-3 left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-b-4 border-r-4 border-ink bg-white" />
      <span className="relative z-10 line-clamp-2">{message}</span>
    </motion.div>
  );
}
