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
      label: "Article Title",
      required: true,
    },
    slugField(),
    {
      name: "category",
      type: "select",
      options: [
        "Cinema & Culture",
        "Festivals",
        "Film News",
        "Filmmaking",
        "Box Office",
        "Tributes",
        "Interviews",
        "TV & Streaming",
      ],
      required: true,
      defaultValue: "Cinema & Culture",
    },
    {
      name: "publishedAt",
      type: "date",
    },
    {
      name: "heroPhoto",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "sub-title",
      type: "text",
      required: true,
    },
    {
      name: "review-body",
      type: "richText",
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
