"use client";

import { motion } from "framer-motion";
import type { AnimationStage, BlobertMood } from "@/types/blobert";

type BlobertEyesProps = {
  mood: BlobertMood;
  stage: AnimationStage;
  gaze: { x: number; y: number };
};

export function BlobertEyes({ mood, stage, gaze }: BlobertEyesProps) {
  const narrow = mood === "judging" || mood === "suspicious" || mood === "disgusted";
  const shocked = stage === "swallowing" || mood === "overloaded";
  const pleased = mood === "impressed" || mood === "approving";
  const focused = stage === "typing" || Math.abs(gaze.x) > 0.05 || Math.abs(gaze.y) > 0.05;

  return (
    <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 gap-7">
      {["left", "right"].map((side) => (
        <motion.div
          key={side}
          className="relative h-24 w-24 rounded-full border-4 border-ink bg-white shadow-xl sm:h-28 sm:w-28"
          animate={{
            scaleY: narrow ? 0.78 : shocked ? 1.12 : pleased ? 0.9 : 1,
            rotate: mood === "disgusted" ? (side === "left" ? -3 : 3) : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink sm:h-12 sm:w-12"
            animate={{
              x: focused ? gaze.x * 12 : side === "left" ? [-3, 4, -3] : [-4, 3, -4],
              y: shocked ? -7 : focused ? gaze.y * 9 : narrow ? 5 : [0, 3, 0],
            }}
            transition={focused ? { type: "spring", stiffness: 190, damping: 16 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute left-2 top-2 h-3 w-3 rounded-full bg-white" />
          </motion.div>
          <motion.div
            className="absolute -top-5 h-3 w-20 rounded-full bg-ink"
            style={{ left: side === "left" ? 6 : 10 }}
            animate={{
              rotate:
                pleased
                  ? side === "left"
                    ? -14
                    : 14
                  : narrow
                    ? side === "left"
                      ? 12
                      : -12
                    : stage === "typing"
                      ? side === "left"
                        ? -5
                        : 5
                      : 0,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
