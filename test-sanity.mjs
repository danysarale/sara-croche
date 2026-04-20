import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vvnmgoum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const products = await client.fetch('*[_type == "product"]{name, "slug": slug.current, isActive}');
console.log(JSON.stringify(products, null, 2));