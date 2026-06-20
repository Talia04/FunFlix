"use client";

import { motion } from "framer-motion";
import type { AnimationStage, BlobertMood, SignupFieldId } from "@/types/blobert";

type BlobertArmsProps = {
  mood: BlobertMood;
  stage: AnimationStage;
  activeField?: SignupFieldId;
};

export function BlobertArms({ mood, stage, activeField }: BlobertArmsProps) {
  const judging = mood === "judging" || mood === "disgusted";
  const pointing = stage === "typing" || stage === "idle";
  const fieldOffset = activeField === "email" ? 8 : activeField === "password" || activeField === "confirmPassword" ? -8 : 0;

  return (
    <>
      <motion.div
        className="absolute left-2 top-[210px] z-0 h-16 w-40 origin-right rounded-full bg-[#ff7bd8] shadow-lg sm:left-0 sm:top-[245px]"
        animate={{
          rotate: judging ? -12 : pointing ? 26 + fieldOffset : [8, 20, 8],
          x: pointing ? 20 : 0,
          y: mood === "impressed" ? -8 : 0,
        }}
        transition={{ duration: 1.8, repeat: stage === "idle" ? Infinity : 0 }}
      >
        <div className="absolute -left-2 top-1 h-14 w-14 rounded-full bg-[#ff7bd8]" />
      </motion.div>
      <motion.div
        className="absolute right-2 top-[205px] z-0 h-16 w-40 origin-left rounded-full bg-[#ff7bd8] shadow-lg sm:right-0 sm:top-[240px]"
        animate={{
          rotate: judging ? 155 : pointing ? -26 + fieldOffset : [-8, -20, -8],
          x: pointing ? -20 : 0,
          y: mood === "impressed" ? -8 : 0,
        }}
        transition={{ duration: 1.8, repeat: stage === "idle" ? Infinity : 0 }}
      >
        <div className="absolute -right-2 top-1 h-14 w-14 rounded-full bg-[#ff7bd8]" />
      </motion.div>
    </>
  );
}
