"use client";

import { motion, type Variants } from "framer-motion";
import type { Product } from "@/data/product";
import { formatCurrency } from "@/utils/whatsapp";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
    }),
  };

  return (
    <motion.div initial="hidden" animate="visible" className="w-full">
      <motion.p
        custom={0}
        variants={itemVariants}
        className="font-script text-brand-rose text-xl md:text-2xl mb-2"
      >
        {product.collection}
      </motion.p>

      <motion.h2
        custom={1}
        variants={itemVariants}
        className="font-serif text-brand-text text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight"
      >
        {product.name}
      </motion.h2>

      <motion.div
        custom={2}
        variants={itemVariants}
        className="my-5 md:my-6 flex items-center gap-3"
      >
        <div className="flex-1 h-px bg-brand-rose-light/50" />
        <span className="font-script text-brand-rose-light text-sm">✿</span>
        <div className="flex-1 h-px bg-brand-rose-light/50" />
      </motion.div>

      <motion.p
        custom={3}
        variants={itemVariants}
        className="font-sans text-brand-text-light text-base md:text-lg leading-relaxed"
      >
        {product.description}
      </motion.p>

      <motion.div custom={4} variants={itemVariants} className="mt-6 md:mt-8">
        <h3 className="font-serif text-brand-text text-lg mb-3 flex items-center gap-2">
          <span className="text-brand-rose">✦</span>
          Detalhes da Peça
        </h3>
        <ul className="space-y-2">
          {product.details.map((detail, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="flex items-center gap-2 text-sm md:text-base text-brand-text-light font-sans"
            >
              <span className="w-1 h-1 rounded-full bg-brand-rose-light flex-shrink-0" />
              {detail}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div custom={5} variants={itemVariants} className="mt-8 md:mt-10">
        <p className="font-sans text-brand-text-muted text-sm mb-1">
          Valor da peça
        </p>
        <span className="font-serif text-brand-text text-3xl md:text-4xl font-bold">
          {formatCurrency(product.price)}
        </span>
        <p className="font-script text-brand-rose text-base mt-2">
          Feito com amor, especialmente para você ♥
        </p>
      </motion.div>
    </motion.div>
  );
}