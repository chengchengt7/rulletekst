import type { CollectionConfig, PayloadRequest } from "payload";

export const isAdmin = ({ req: { user } }: { req: PayloadRequest }) => user?.role === "admin";
export const canEditContent = ({ req: { user } }: { req: PayloadRequest }) => user?.role === "admin" || user?.role === "editor";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "name",
  },
  access: {
    admin: canEditContent,
    unlock: isAdmin,
    create: isAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return { id: { equals: user.id } };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return { id: { equals: user.id } };
    },
    delete: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "role",
      type: "select",
      access: {
        update: isAdmin,
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Visitor", value: "visitor" },
      ],
      required: true,
      defaultValue: "visitor",
    },
  ],
};
