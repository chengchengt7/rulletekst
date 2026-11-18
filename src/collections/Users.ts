import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "updatedAt"],
  },
  auth: true,
  fields: [
    // Email and password are provided by Payload's email-based authentication.
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description:
          "The display name for this account. Use your email address to log in.",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
      filterOptions: {
        mimeType: { contains: "image/" },
      },
    },
  ],
};
