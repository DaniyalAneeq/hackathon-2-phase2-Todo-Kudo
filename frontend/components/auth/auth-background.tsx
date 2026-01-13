"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AuthBackground - Animated geometric shapes background for auth pages
 * Matches the landing page design language
 */

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Animated shapes */}
      <ElegantShape
        delay={0.2}
        width={500}
        height={120}
        rotate={12}
        gradient="from-indigo-500/[0.12]"
        className="left-[-15%] top-[10%]"
      />

      <ElegantShape
        delay={0.4}
        width={400}
        height={100}
        rotate={-15}
        gradient="from-rose-500/[0.12]"
        className="right-[-10%] top-[60%]"
      />

      <ElegantShape
        delay={0.3}
        width={250}
        height={70}
        rotate={-8}
        gradient="from-violet-500/[0.12]"
        className="left-[10%] bottom-[15%]"
      />

      <ElegantShape
        delay={0.5}
        width={180}
        height={50}
        rotate={20}
        gradient="from-amber-500/[0.12]"
        className="right-[20%] top-[15%]"
      />

      <ElegantShape
        delay={0.6}
        width={120}
        height={35}
        rotate={-25}
        gradient="from-cyan-500/[0.12]"
        className="left-[30%] top-[5%]"
      />

      {/* Top and bottom fade gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
}
