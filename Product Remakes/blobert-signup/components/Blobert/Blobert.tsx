"use client";

import { motion } from "framer-motion";
import type { AnimationStage, BlobertMood, SignupFieldId } from "@/types/blobert";
import { moodColors } from "@/lib/blobertMood";
import { BlobertArms } from "./BlobertArms";
import { BlobertBody } from "./BlobertBody";
import { BlobertEyes } from "./BlobertEyes";
import { BlobertMouth } from "./BlobertMouth";

type BlobertProps = {
  mood: BlobertMood;
  stage: AnimationStage;
  activeField?: SignupFieldId;
  gaze: { x: number; y: number };
  children?: React.ReactNode;
};

export function Blobert({ mood, stage, activeField, gaze, children }: BlobertProps) {
  const bodyColor = moodColors[mood];
  const isChewing = stage === "chewing" || stage === "digesting";

  return (
    <motion.div
      className="relative mx-auto h-[430px] w-full max-w-[430px] sm:h-[500px] sm:max-w-[500px]"
      animate={{
        y: [0, -8, 0],
        rotate: isChewing ? [-1, 2, -2, 1] : [-1, 1, -1],
      }}
      transition={{
        duration: isChewing ? 0.5 : 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-label="Blobert the signup monster"
      role="img"
    >
      <BlobertArms mood={mood} stage={stage} activeField={activeField} />
      <BlobertBody color={bodyColor} stage={stage} />
      <BlobertEyes mood={mood} stage={stage} gaze={gaze} />
      <BlobertMouth stage={stage}>{children}</BlobertMouth>
      <div className="absolute bottom-4 left-[28%] h-12 w-16 rounded-b-full bg-[#7b3cff] shadow-lg" />
      <div className="absolute bottom-4 right-[28%] h-12 w-16 rounded-b-full bg-[#7b3cff] shadow-lg" />
    </motion.div>
  );
}
