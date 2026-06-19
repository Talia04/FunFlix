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
      className="pointer-events-none absolute left-1/2 top-[170px] z-40 max-w-[220px] -translate-x-1/2 truncate rounded-full bg-lime px-5 py-3 text-sm font-black text-ink shadow-2xl"
      initial={{ opacity: 0, y: -90, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], y: [0, 40, 75, 95], scale: [0.8, 1.08, 0.92, 0.2] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}
