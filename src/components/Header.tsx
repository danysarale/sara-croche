"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-8 md:py-12 lg:py-16 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-script text-brand-rose text-6xl md:text-7xl lg:text-8xl leading-none select-none">
            S
          </span>

          <h1 className="font-serif text-brand-rose text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] uppercase mt-2">
            Sara
          </h1>
          <span className="font-script text-brand-rose text-xl md:text-2xl lg:text-3xl -mt-1">
            Crochê
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-script text-brand-text-muted text-lg md:text-xl mt-4"
        >
          Feito à mão com amor ♥
        </motion.p>

        {/* Divider decorativo */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-6 md:mt-8 flex items-center gap-3 w-full max-w-xs"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-rose-light" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-rose-light" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-rose-light" />
        </motion.div>
      </div>
    </motion.header>
  );
}