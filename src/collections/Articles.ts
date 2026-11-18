import { CollectionConfig, slugField } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "article title",
      required: true,
    },
    slugField(),
    {
      name: "publishedAt",
      label: "Publication Date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "heroPhoto",
      label: "Hero Photo",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: { mimeType: { contains: "image/" } },
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      filterOptions: { mimeType: { contains: "image/" } },
    },
    {
      name: "sub-title",
      type: "text",
      label: "sub title",
      required: true,
    },
    {
      name: "review-body",
      type: "richText",
      label: "review body",
      required: true,
    },
    {
      name: "journalist",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],
};
