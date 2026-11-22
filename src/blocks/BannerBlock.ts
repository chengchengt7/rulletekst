import type { Block } from "payload";

export const BannerBlock: Block = {
  slug: "banner",
  interfaceName: "BannerBlock",
  fields: [
    {
      name: "bannerFilmNight",
      type: "relationship",
      relationTo: "film-nights",
      hasMany: false,
      required: true,
      admin: { description: "Choose one film night to display in the banner." },
    },
  ],
};
