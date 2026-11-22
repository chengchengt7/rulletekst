import type { Block } from "payload";

export const BannerBlock: Block = {
  slug: "banner",
  interfaceName: "BannerBlock",
  labels: { singular: "Banner", plural: "Banners" },
  fields: [
    {
      name: "filmNight",
      type: "relationship",
      relationTo: "film-nights",
      hasMany: false,
      required: true,
      admin: { description: "Choose one film night to display in the banner." },
    },
  ],
};
