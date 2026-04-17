import { defineType, defineField } from "sanity";

export default defineType({
  name: "card",
  title: "Cartão",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do Cartão",
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
      description: "Um emoji para representar o cartão (ex: 🎂, ❤️, ✨)",
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