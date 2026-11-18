import { CollectionConfig, slugField } from "payload";

export const Actors: CollectionConfig = {
  slug: "actors",
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
    slugField(),
  ],
};
