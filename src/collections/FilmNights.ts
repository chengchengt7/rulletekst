import { CollectionConfig, slugField } from "payload";

export const FilmNights: CollectionConfig = {
  slug: "film-nights",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Film Name",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "event-date",
      type: "date",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "heroPhoto",
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
      type: "select",
      options: ["G", "PG", "PG-13", "R", "NC-17", "NR (US)"],
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
  ],
};
