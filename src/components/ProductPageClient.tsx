"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import GiftExperienceFlow from "@/components/GiftExperienceFlow";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Product, PackagingOption, CardOption } from "@/data/product";

interface ProductPageClientProps {
  product: Product;
  packagingOptions: PackagingOption[];
  cardOptions: CardOption[];
}

export default function ProductPageClient({
  product,
  packagingOptions,
  cardOptions,
}: ProductPageClientProps) {
  const [isGift, setIsGift] = useState(false);
  const [selectedPackaging, setSelectedPackaging] =
    useState<PackagingOption | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardOption | null>(null);
  const [giftMessage, setGiftMessage] = useState("");

  return (
    <main className="min-h-screen bg-brand-bg">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <ProductGallery images={product.images} />
          </div>

          <div>
            <ProductInfo product={product} />

            <GiftExperienceFlow
              isGift={isGift}
              setIsGift={setIsGift}
              selectedPackaging={selectedPackaging}
              setSelectedPackaging={setSelectedPackaging}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              giftMessage={giftMessage}
              setGiftMessage={setGiftMessage}
              packagingOptions={packagingOptions}
              cardOptions={cardOptions}
            />

            <WhatsAppButton
              product={product}
              isGift={isGift}
              selectedPackaging={selectedPackaging}
              selectedCard={selectedCard}
              giftMessage={giftMessage}
            />
          </div>
        </div>
      </div>

      <footer className="py-8 text-center border-t border-brand-rose-light/20">
        <p className="font-script text-brand-rose text-xl mb-1">
          Sara Crochê
        </p>
        <p className="font-sans text-brand-text-muted text-sm">
          Cada peça carrega um pedacinho de amor ♥
        </p>
      </footer>
    </main>
  );
}