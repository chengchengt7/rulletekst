import type { GlobalConfig } from "payload";
import { ReviewBlock } from "../blocks/ReviewBlock";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Homepage",
  access: { read: () => true },
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [ReviewBlock],
      required: true,
      minRows: 1,
      maxRows: 1,
    },
  ],
};
