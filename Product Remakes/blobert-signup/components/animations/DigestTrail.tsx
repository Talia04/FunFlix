"use client";

import { motion } from "framer-motion";

export function DigestTrail() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {[0, 1, 2, 3].map((bubble) => (
        <motion.span
          key={bubble}
          className="absolute left-1/2 top-64 h-4 w-4 rounded-full bg-white/70"
          style={{ marginLeft: -30 + bubble * 20 }}
          animate={{ y: [40, -30], opacity: [0, 1, 0], scale: [0.4, 1, 0.2] }}
          transition={{ duration: 1, delay: bubble * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
