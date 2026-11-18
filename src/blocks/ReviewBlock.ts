import type { Block } from "payload";

export const ReviewBlock: Block = {
  slug: "reviewCards",
  interfaceName: "ReviewCardsBlock",
  labels: { singular: "Review Cards", plural: "Review Cards" },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Reviews",
      required: true,
    },
    {
      name: "reviews",
      type: "relationship",
      relationTo: "reviews",
      hasMany: true,
      minRows: 6,
      maxRows: 6,
      required: true,
      admin: {
        isSortable: true,
        description: "Select six reviews in the order they should appear.",
      },
    },
  ],
};
