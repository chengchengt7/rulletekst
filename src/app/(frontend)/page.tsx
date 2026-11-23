import Banner from "./components/Banner/Banner";
import CardRow from "./components/CardRow/CardRow";
import FilmNights from "./components/FilmNights/FilmNights";
import Slogan from "./components/Slogan/Slogan";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Article, Media, Review } from "@/payload-types";

export default async function HomePage() {
  const payload = await getPayload({ config });
  const home = await payload.findGlobal({
    slug: "homepage",
    depth: 2,
    populate: {
      reviews: {
        title: true,
        slug: true,
        heroPhoto: true,
        "review-title": true,
        "reivew-rating": true,
        "sub-title": true,
        journalist: true,
      },
      users: { name: true },
    },
  });

  const reviews = home.layout.some((block) => block.blockType === "slogan")
    ? (await payload.find({
        collection: "reviews",
        depth: 1,
        pagination: false,
        sort: "id",
        select: { heroPhoto: true },
      })).docs
    : [];
  const photos = reviews
    .map((review) => review.heroPhoto)
    .filter((photo): photo is Media => typeof photo === "object" && photo !== null && Boolean(photo.url))
    .filter((photo, index, all) => all.findIndex((item) => item.id === photo.id) === index);

  return (
    <div className="home-page">
      <div className="container">
        {home.layout.map((block) => block.blockType === "banner" ? (
          <Banner key={block.id} block={block} />
        ) : block.blockType === "slogan" ? (
          <Slogan key={block.id} block={block} images={photos} />
        ) : block.blockType === "film-nights" ? (
          <FilmNights key={block.id} block={block} />
        ) : block.blockType === "articleCards" ? (
          <CardRow key={block.id} title={block.title} href="/articles">
            {(block.articles as Article[]).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </CardRow>
        ) : block.blockType === "reviewCards" ? (
          <CardRow key={block.id} title={block.title} href="/film-reviews">
            {(block.reviews as Review[]).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </CardRow>
        ) : null)}
      </div>
    </div>
  );
}
