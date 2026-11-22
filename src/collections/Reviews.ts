import { CollectionConfig, slugField } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Film Name",
      required: true,
    },
    slugField(),
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
      name: "director",
      type: "relationship",
      relationTo: "directors",
      required: true,
    },
    {
      name: "duration",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "age-rating",
      type: "select",
      options: ["G", "PG", "PG-13", "R", "NC-17", "NR (US)"],
      required: true,
    },
    {
      name: "actors",
      type: "relationship",
      relationTo: "actors",
      hasMany: true,
      minRows: 1,
      maxRows: 4,
      required: true,
    },
    {
      name: "review-title",
      type: "text",
      required: true,
    },
    {
      name: "reivew-rating",
      type: "select",
      options: ["1", "2", "3", "4", "5", "6"],
      required: true,
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
