import { CollectionConfig, slugField } from "payload";

export const FilmNights: CollectionConfig = {
  slug: "film-nights",
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
      required: true,
    },
    {
      name: "ticketPhoto",
      type: "upload",
      relationTo: "media",
      required: true,
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
      name: "description",
      type: "richText",
      label: "review body",
      required: true,
    },
  ],
};
