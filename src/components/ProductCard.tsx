"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/whatsapp";

interface ProductCardProps {
  name: string;
  slug: string;
  collection: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
}

export default function ProductCard({ name, slug, collection, price, image }: ProductCardProps) {
  return (
    <Link href={`/produto/${slug}`}>
      <motion.div
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-md transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Imagem */}
        <div className="relative aspect-square overflow-hidden bg-brand-bg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Info */}
        <div className="p-4 text-center">
          <p className="font-script text-brand-rose text-sm mb-1">{collection}</p>
          <h3 className="font-serif text-brand-text text-lg font-semibold mb-2">{name}</h3>
          <div className="w-8 h-px bg-brand-rose/30 mx-auto mb-2" />
          <p className="font-sans text-brand-text font-bold text-base">
            {formatCurrency(price)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}