import type { Block } from "payload";

export const FilmNightsBlock: Block = {
  slug: "film-nights",
  interfaceName: "FilmNightsBlock",
  fields: [
    {
      name: "filmNights",
      type: "relationship",
      relationTo: "film-nights",
      hasMany: true,
      minRows: 1,
      maxRows: 3,
      required: true,
      admin: {
        isSortable: true,
        description: "Choose three film nights in the order they should appear.",
      },
    },
  ],
};
