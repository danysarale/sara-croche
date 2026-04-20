import { getProductBySlug, getPackagingOptions, getCardOptions } from "@/sanity/queries";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/ProductPageClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [sanityProduct, sanityPackaging, sanityCards] = await Promise.all([
    getProductBySlug(slug).catch(() => null),
    getPackagingOptions().catch(() => null),
    getCardOptions().catch(() => null),
  ]);

  if (!sanityProduct) {
    notFound();
  }

  const product = {
    ...sanityProduct,
    images: sanityProduct.images?.map(
      (img: { _key: string; alt?: string; asset?: { url: string } }, index: number) => ({
        id: img._key || `img-${index}`,
        src: img.asset?.url || "/images/placeholder.png",
        alt: img.alt || sanityProduct.name || "Produto",
      })
    ) || [],
  };

  const packagingOptions = sanityPackaging?.length ? sanityPackaging : [];
  const cardOptions = sanityCards?.length ? sanityCards : [];

  return (
    <ProductPageClient
      product={product}
      packagingOptions={packagingOptions}
      cardOptions={cardOptions}
    />
  );
}