import type { GlobalConfig } from "payload";
import { ReviewBlock } from "../blocks/ReviewBlock";
import { BannerBlock } from "../blocks/BannerBlock";
import { FilmNightsBlock } from "../blocks/FilmNightsBlock";
import { ArticleBlock } from "../blocks/ArticleBlock";
import { SloganBlock } from "../blocks/SloganBlock";

export const HomePage: GlobalConfig = {
  slug: "homepage",
  fields: [
    {
      name: "layout",
      type: "blocks",
      blocks: [BannerBlock, SloganBlock, ArticleBlock, ReviewBlock, FilmNightsBlock],
      required: true,
    },
  ],
};
