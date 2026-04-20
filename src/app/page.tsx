import { getAllProducts } from "@/sanity/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60; // revalida a cada 60 segundos

export default async function Home() {
  const products = await getAllProducts().catch(() => []);

  return (
    <main className="min-h-screen bg-brand-bg">
      <Header />

      {/* Vitrine */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="font-serif text-brand-text text-2xl md:text-3xl font-bold mb-2">
            Nossas Peças
          </h2>
          <p className="font-sans text-brand-text/60 text-sm">
            Cada miniatura é única, feita à mão com carinho e dedicação ♥
          </p>
          <div className="w-16 h-px bg-brand-rose/40 mx-auto mt-4" />
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: {
              _id: string;
              name: string;
              slug: string;
              collection: string;
              price: number;
              image?: {
                alt?: string;
                asset?: { url: string };
              };
            }) => (
              <ProductCard
                key={product._id}
                name={product.name}
                slug={product.slug}
                collection={product.collection}
                price={product.price}
                image={{
                  src: product.image?.asset?.url || "/images/placeholder.png",
                  alt: product.image?.alt || product.name,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-script text-brand-rose text-2xl mb-2">Em breve...</p>
            <p className="font-sans text-brand-text/60 text-sm">
              Estamos preparando peças especiais para você ♥
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}