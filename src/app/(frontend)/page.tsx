import Banner from "./components/Banner/Banner";
import Gallery from "./components/Gallery/Gallery";
import CardRow from "./components/CardRow/CardRow";
import FilmNights from "./components/FilmNights/FilmNights";
import Slogan from "./components/Slogan/Slogan";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Review } from "@/payload-types";

export default async function HomePage() {
  const payload = await getPayload({ config });
  const { docs: articles } = await payload.find({
    collection: "articles",
    sort: "-publishedAt",
    limit: 6,
    depth: 1,
    populate: { users: { name: true } },
  });
  const home = await payload.findGlobal({
    slug: "home",
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

  const photos = [
    ...home.layout.flatMap((block) => (block.reviews as Review[]).map((review) => review.heroPhoto as Media)),
    ...articles.map((article) => article.heroPhoto as Media),
  ];

  return (
    <div className="home-page">
      <div className="container">
        <Banner />
        <div className="home-gallery-area">
          <Gallery images={photos} background />
          <Slogan />
          {articles.length > 0 && (
            <CardRow title="Articles" href="/articles">
              {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
            </CardRow>
          )}
          {home.layout.map((block) => (
            <CardRow key={block.id} title={block.title} href="/film-reviews">
              {(block.reviews as Review[]).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </CardRow>
          ))}
        </div>
      </div>
      <FilmNights />
    </div>
  );
}
