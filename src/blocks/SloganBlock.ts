import type { Block } from "payload";

export const SloganBlock: Block = {
  slug: "slogan",
  interfaceName: "SloganBlock",
  labels: { singular: "Slogan", plural: "Slogans" },
  fields: [
    {
      name: "slogan",
      type: "textarea",
      required: true,
      defaultValue: "The film ends.\nThe conversation begins.",
      admin: {
        description: "Use a new line to split the slogan. Film images are automatically pulled from review cover images.",
      },
    },
  ],
};
