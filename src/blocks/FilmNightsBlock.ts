import type { Block } from "payload";

export const FilmNightsBlock: Block = {
  slug: "filmNights",
  interfaceName: "FilmNightsBlock",
  labels: { singular: "Film Nights", plural: "Film Nights" },
  fields: [
    {
      name: "filmNights",
      type: "relationship",
      relationTo: "film-nights",
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      required: true,
      admin: {
        isSortable: true,
        description: "Choose three film nights in the order they should appear.",
      },
    },
  ],
};
