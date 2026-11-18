import Banner from "./components/Banner/Banner";
import CardRow from "./components/CardRow/CardRow";
import FilmNights from "./components/FilmNights/FilmNights";
import Slogan from "./components/Slogan/Slogan";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import ReviewCard from "./components/ReviewCard/ReviewCard";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Review } from "@/payload-types";

export default async function HomePage() {
  const payload = await getPayload({ config });
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

  return (
    <div className="home-page">
      <div className="container">
        <Banner />
        <Slogan />
        <CardRow title="Articles" href="/articles">
          <ArticleCard />
          <ArticleCard />
        </CardRow>
        {home.layout.map((block) => (
          <CardRow key={block.id} title={block.title} href="/film-reviews">
            {(block.reviews as Review[]).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </CardRow>
        ))}
      </div>
      <FilmNights />

    </div>
  )
}
