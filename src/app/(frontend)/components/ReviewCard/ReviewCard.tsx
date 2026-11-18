import Link from "next/link";
import type { Media, Rating, Review, User } from "@/payload-types";
import "./ReviewCard.css";

type ReviewCardProps = {
  review: Pick<Review, "title" | "slug" | "heroPhoto" | "review-title" | "reivew-rating" | "sub-title" | "journalist">;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const photo = review.heroPhoto as Media;
  const rating = review["reivew-rating"] as Rating;
  const journalist = review.journalist as User;

  return (
    <Link href={`/film-reviews/${review.slug}`} className="review-card">
      <div className="review-card__image">
        <img src={photo.url!} alt={photo.alt} loading="lazy" />
        <span className="review-card__rating">
          <img src={`/images/dice-accent/dice-${rating.title}.png`} alt={`Rated ${rating.title} out of 6`} width={36} height={36} />
        </span>
      </div>
      <div className="content">
        <h4>{review.title}: {review["review-title"]}</h4>
        <p>{review["sub-title"]}</p>
        <h5>By <span>{journalist.name}</span></h5>
      </div>
    </Link>
  )
}
