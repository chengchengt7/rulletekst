import type { GlobalConfig } from "payload";
import { ReviewBlock } from "../blocks/ReviewBlock";
import { BannerBlock } from "../blocks/BannerBlock";
import { FilmNightsBlock } from "../blocks/FilmNightsBlock";
import { ArticleBlock } from "../blocks/ArticleBlock";

export const HomePage: GlobalConfig = {
  slug: "home",
  label: "HomePage",
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [BannerBlock, ArticleBlock, ReviewBlock, FilmNightsBlock],
      required: true,
    },
  ],
};
