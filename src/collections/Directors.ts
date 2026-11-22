import { CollectionConfig } from "payload";

export const Directors: CollectionConfig = {
  slug: "directors",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Name",
      required: true,
    },
  ],
};
