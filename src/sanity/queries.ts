import { client } from "./client";

// ─── Query: Buscar TODOS os produtos ativos (vitrine) ─────
export async function getAllProducts() {
  const query = `*[_type == "product" && isActive == true] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    collection,
    description,
    price,
    "image": images[0] {
      _key,
      alt,
      asset-> {
        _id,
        url
      }
    }
  }`;

  return client.fetch(query);
}

// ─── Query: Buscar UM produto pelo slug ───────────────────
export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    "slug": slug.current,
    collection,
    description,
    details,
    price,
    images[] {
      _key,
      alt,
      asset-> {
        _id,
        url
      }
    }
  }`;

  return client.fetch(query, { slug });
}

// ─── Query: Buscar o primeiro produto ativo (fallback) ────
export async function getProduct() {
  const query = `*[_type == "product" && isActive == true][0] {
    _id,
    name,
    "slug": slug.current,
    collection,
    description,
    details,
    price,
    images[] {
      _key,
      alt,
      asset-> {
        _id,
        url
      }
    }
  }`;

  return client.fetch(query);
}

// ─── Query: Buscar embalagens ativas ──────────────────────
export async function getPackagingOptions() {
  const query = `*[_type == "packaging" && isActive == true] | order(_createdAt asc) {
    _id,
    name,
    description,
    price,
    icon
  }`;

  return client.fetch(query);
}

// ─── Query: Buscar cartões ativos ─────────────────────────
export async function getCardOptions() {
  const query = `*[_type == "card" && isActive == true] | order(_createdAt asc) {
    _id,
    name,
    description,
    price,
    icon
  }`;

  return client.fetch(query);
}