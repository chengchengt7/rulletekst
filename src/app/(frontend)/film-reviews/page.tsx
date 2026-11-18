import { getPayload } from "payload";
import config from "@payload-config";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import "./page.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Film Reviews | Rulletekst" };

export default async function FilmReviewsPage() {
  const payload = await getPayload({ config });
  const { docs: reviews } = await payload.find({
    collection: "reviews",
    depth: 1,
    pagination: false,
    limit: 0,
    sort: ["-createdAt", "-id"],
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
      <h1>Film reviews</h1>
      {reviews.length ? (
        <div className="reviews-grid">
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
      ) : <p>No reviews yet.</p>}
    </div>
  );
}
