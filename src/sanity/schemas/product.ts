import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do Produto",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Coleção",
      type: "string",
      placeholder: "Ex: Coleção Miniworld",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      title: "Detalhes da Peça",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "images",
      title: "Fotos do Produto",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Descrição da foto",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "isActive",
      title: "Produto ativo?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "collection",
      media: "images.0",
    },
  },
});