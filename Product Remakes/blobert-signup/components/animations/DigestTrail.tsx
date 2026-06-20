"use client";

import { motion } from "framer-motion";

export function DigestTrail() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {[0, 1, 2, 3, 4].map((bubble) => (
        <motion.span
          key={bubble}
          className="absolute left-1/2 top-[250px] h-5 w-5 rounded-full border-2 border-white/70 bg-lime shadow-lg sm:top-[290px]"
          style={{ marginLeft: -38 + bubble * 19 }}
          animate={{
            x: [0, bubble % 2 === 0 ? -18 : 18, bubble % 2 === 0 ? 12 : -12],
            y: [0, 52, 116],
            opacity: [0, 1, 1, 0],
            scale: [0.3, 1, 0.45],
          }}
          transition={{ duration: 1.05, delay: bubble * 0.12, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-[300px] h-20 w-32 -translate-x-1/2 rounded-[50%] border-2 border-dashed border-white/40 sm:top-[345px]"
        animate={{ rotate: 360, opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
