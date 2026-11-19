import type { GlobalConfig } from "payload";
import { ReviewBlock } from "../blocks/ReviewBlock";

export const Home: GlobalConfig = {
  slug: "home",
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [ReviewBlock],
      required: true,
    },
  ],
};
