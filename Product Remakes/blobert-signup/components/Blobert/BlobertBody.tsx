"use client";

import { motion } from "framer-motion";
import type { AnimationStage } from "@/types/blobert";

type BlobertBodyProps = {
  color: string;
  stage: AnimationStage;
};

export function BlobertBody({ color, stage }: BlobertBodyProps) {
  const isDigesting = stage === "digesting" || stage === "judging";

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 h-[330px] w-[330px] -translate-x-1/2 rounded-[48%_52%_44%_56%/56%_50%_50%_44%] border-4 border-white/40 shadow-jelly backdrop-blur-sm sm:h-[390px] sm:w-[390px]"
      style={{
        background: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.78), transparent 18%), radial-gradient(circle at 58% 62%, rgba(255,255,255,0.22), transparent 28%), ${color}cc`,
      }}
      animate={{
        scaleX: stage === "chewing" ? [1, 1.04, 0.96, 1] : [1, 1.02, 1],
        scaleY: stage === "chewing" ? [1, 0.97, 1.03, 1] : [1, 0.99, 1],
      }}
      transition={{ duration: stage === "chewing" ? 0.45 : 3, repeat: Infinity }}
    >
      <div className="absolute left-16 top-16 h-20 w-10 rotate-45 rounded-full bg-white/45 blur-[1px]" />
      <div className="absolute right-20 top-28 h-10 w-20 rounded-full bg-white/20" />
      <motion.div
        className="absolute bottom-20 left-1/2 h-28 w-36 -translate-x-1/2 rounded-full border-2 border-white/20 bg-white/15"
        animate={{
          boxShadow: isDigesting
            ? [
                "0 0 0 rgba(255,255,255,0)",
                "0 0 36px rgba(255,255,255,0.85)",
                "0 0 0 rgba(255,255,255,0)",
              ]
            : "0 0 0 rgba(255,255,255,0)",
        }}
        transition={{ duration: 1.2, repeat: isDigesting ? Infinity : 0 }}
      />
      {isDigesting ? (
        <motion.div
          className="absolute left-1/2 top-40 h-12 w-28 -translate-x-1/2 rounded-full bg-lime/80 text-center text-xs font-black leading-[3rem] text-ink shadow-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 100, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          gulp
        </motion.div>
      ) : null}
    </motion.div>
  );
}
