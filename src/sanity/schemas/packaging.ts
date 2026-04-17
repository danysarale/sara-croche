import { defineType, defineField } from "sanity";

export default defineType({
  name: "packaging",
  title: "Embalagem",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome da Embalagem",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Preço (R$)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "icon",
      title: "Emoji",
      type: "string",
      description: "Um emoji para representar a embalagem (ex: 🎁, 🛍️)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Ativo?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "icon",
    },
  },
});