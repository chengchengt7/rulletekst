import { CollectionConfig } from "payload";

export const Rating: CollectionConfig = {
  slug: "rating",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "select",
      label: "rating",
      required: true,
      options: ["1", "2", "3", "4", "5", "6"],
    },
  ],
};
