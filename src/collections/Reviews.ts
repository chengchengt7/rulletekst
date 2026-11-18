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
      label: "film name",
      required: true,
    },
    slugField(),
    {
      name: "heroPhoto",
      label: "Hero Photo",
      type: "upload",
      relationTo: "media",
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
      name: "ratingBlock",
      label: "Rating Block",
      type: "relationship",
      relationTo: "rating-block",
      required: true,
    },
    {
      name: "actors",
      type: "relationship",
      relationTo: "actors",
      hasMany: true,
      required: true,
    },
    {
      name: "review-title",
      type: "text",
      label: "review title",
      required: true,
    },
    {
      name: "reivew-rating",
      type: "relationship",
      relationTo: "rating",
      required: true,
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
    },
  ],
};
