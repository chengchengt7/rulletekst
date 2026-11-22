import type { Block } from "payload";

export const ArticleBlock: Block = {
  slug: "articleCards",
  interfaceName: "ArticleCardsBlock",
  labels: { singular: "Article Cards", plural: "Article Cards" },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Articles",
      required: true,
    },
    {
      name: "articles",
      type: "relationship",
      relationTo: "articles",
      hasMany: true,
      minRows: 6,
      maxRows: 6,
      required: true,
      admin: {
        isSortable: true,
        description: "Select six articles in the order they should appear.",
      },
    },
  ],
};
