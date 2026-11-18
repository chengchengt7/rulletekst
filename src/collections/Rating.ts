import { CollectionConfig } from "payload";

export const Rating: CollectionConfig = {
  slug: "rating",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "number",
      label: "rating",
      required: true,
    },
  ],
};
