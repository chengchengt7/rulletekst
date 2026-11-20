import type { CollectionConfig } from "payload";
import { isAdmin } from "./Users";

export const Reservations: CollectionConfig = {
  slug: "reservations",
  admin: { useAsTitle: "email" },
  access: {
    create: () => false,
    read: isAdmin,
    update: () => false,
    delete: isAdmin,
  },
  indexes: [{ fields: ["email", "filmNight"], unique: true }],
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      maxLength: 120,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "age",
      type: "number",
      required: true,
      min: 0,
      validate: (value: unknown) => Number.isInteger(value) || "Age must be a whole number.",
    },
    {
      name: "filmNight",
      type: "relationship",
      relationTo: "film-nights",
      required: true,
    },
    {
      name: "visitorHash",
      type: "text",
      required: true,
      index: true,
      admin: { hidden: true },
      access: { read: () => false },
    },
  ],
};
