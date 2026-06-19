"use client";

import { motion } from "framer-motion";
import type { AnimationStage, BlobertMood } from "@/types/blobert";

type BlobertArmsProps = {
  mood: BlobertMood;
  stage: AnimationStage;
};

export function BlobertArms({ mood, stage }: BlobertArmsProps) {
  const judging = mood === "judging" || mood === "disgusted";

  return (
    <>
      <motion.div
        className="absolute left-2 top-[210px] z-0 h-16 w-40 origin-right rounded-full bg-[#ff7bd8] shadow-lg sm:left-0 sm:top-[245px]"
        animate={{
          rotate: judging ? -12 : stage === "typing" ? 26 : [8, 20, 8],
          x: stage === "typing" ? 20 : 0,
        }}
        transition={{ duration: 1.8, repeat: stage === "idle" ? Infinity : 0 }}
      >
        <div className="absolute -left-2 top-1 h-14 w-14 rounded-full bg-[#ff7bd8]" />
      </motion.div>
      <motion.div
        className="absolute right-2 top-[205px] z-0 h-16 w-40 origin-left rounded-full bg-[#ff7bd8] shadow-lg sm:right-0 sm:top-[240px]"
        animate={{
          rotate: judging ? 155 : stage === "typing" ? -26 : [-8, -20, -8],
          x: stage === "typing" ? -20 : 0,
        }}
        transition={{ duration: 1.8, repeat: stage === "idle" ? Infinity : 0 }}
      >
        <div className="absolute -right-2 top-1 h-14 w-14 rounded-full bg-[#ff7bd8]" />
      </motion.div>
    </>
  );
}
