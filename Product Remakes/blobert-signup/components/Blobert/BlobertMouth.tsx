"use client";

import { motion } from "framer-motion";
import type { AnimationStage } from "@/types/blobert";

type BlobertMouthProps = {
  stage: AnimationStage;
  children?: React.ReactNode;
};

export function BlobertMouth({ stage, children }: BlobertMouthProps) {
  const open = stage === "typing" || stage === "swallowing" || stage === "idle";

  return (
    <motion.div
      className="absolute left-1/2 top-[195px] z-30 flex h-28 w-[270px] -translate-x-1/2 items-center justify-center rounded-[48px] border-4 border-ink bg-[#321143] p-4 shadow-inner sm:top-[235px] sm:w-[320px]"
      animate={{
        scaleX: stage === "chewing" ? [1, 0.94, 1.05, 1] : open ? 1 : 0.92,
        scaleY: stage === "chewing" ? [1, 0.7, 1.12, 0.9] : open ? 1 : 0.78,
      }}
      transition={{ duration: stage === "chewing" ? 0.4 : 0.2, repeat: stage === "chewing" ? Infinity : 0 }}
    >
      <div className="absolute -top-1 left-9 flex gap-4">
        {[0, 1, 2, 3, 4].map((tooth) => (
          <div key={tooth} className="h-5 w-4 rounded-b-md bg-white" />
        ))}
      </div>
      <div className="absolute -bottom-1 left-14 flex gap-5">
        {[0, 1, 2, 3].map((tooth) => (
          <div key={tooth} className="h-5 w-4 rounded-t-md bg-white" />
        ))}
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </motion.div>
  );
}
