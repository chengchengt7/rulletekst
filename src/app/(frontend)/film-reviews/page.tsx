import { getPayload } from "payload";
import config from "@payload-config";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import ReviewSort from "./ReviewSort";
import "./page.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Film Reviews | Rulletekst" };

const sortOptions = {
  newest: ["-createdAt", "-id"],
  oldest: ["createdAt", "id"],
  title: ["title", "id"],
};

export default async function FilmReviewsPage({ searchParams }: {
  searchParams: Promise<{ sort?: string | string[] }>;
}) {
  const { sort: requestedSort } = await searchParams;
  const sort = requestedSort === "oldest" || requestedSort === "title" ? requestedSort : "newest";
  const payload = await getPayload({ config });
  const { docs: reviews } = await payload.find({
    collection: "reviews",
    depth: 1,
    pagination: false,
    limit: 0,
    sort: sortOptions[sort],
    select: {
      title: true,
      slug: true,
      heroPhoto: true,
      "review-title": true,
      "reivew-rating": true,
      "sub-title": true,
      journalist: true,
    },
    populate: { users: { name: true } },
  });

  return (
    <div className="film-reviews container">
      <div className="film-reviews-heading">
        <h1>Film reviews</h1>
        <ReviewSort sort={sort} />
      </div>
      {reviews.length ? (
        <div className="reviews-grid">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      ) : <p>No reviews yet.</p>}
    </div>
  );
}
