"use client";

import { motion } from "framer-motion";

type FlyingInputProps = {
  text: string;
};

export function FlyingInput({ text }: FlyingInputProps) {
  if (!text) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[120px] z-40 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-lime text-center text-xs font-black text-ink shadow-2xl"
      initial={{ opacity: 0, y: -70, scale: 0.5, rotate: -18 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 45, 110, 150],
        scale: [0.5, 1.1, 0.9, 0.12],
        rotate: [-18, 12, -8, 20],
      }}
      transition={{ duration: 0.78, ease: "easeIn" }}
    >
      <span className="max-w-[54px] truncate">{text}</span>
      <span className="absolute left-3 top-3 h-3 w-3 rounded-full bg-white/80" />
      <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-ink/25" />
    </motion.div>
  );
}
