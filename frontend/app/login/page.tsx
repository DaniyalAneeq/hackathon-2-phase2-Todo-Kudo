"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthBackground } from "@/components/auth/auth-background";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <AuthBackground />

      {/* Navigation */}
      <nav className="relative z-20 w-full px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-bold text-xl hover:opacity-80 transition-opacity focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
          >
            Kudo
          </Link>
          <Link
            href="/signup"
            className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
          >
            Create Account
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Welcome to Kudo
            </span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Your modern task management companion. Stay organized and boost your productivity.
          </p>
        </motion.div>

        {/* Login Form */}
        <LoginForm />

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            &larr; Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
