import { CollectionConfig } from "payload";

export const AgeRating: CollectionConfig = {
  slug: "rating-block",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "rating-block",
      required: true,
    },
  ],
};
