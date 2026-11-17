import Link from "next/link";
import "./ReviewCard.css";

type ReviewCardProps = {
  rating?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function ReviewCard({ rating = 3 }: ReviewCardProps) {
  return (
    <Link href="/articles/abc" className="review-card">
      <img src="/Intersteller.png" alt="" />
      <span className="review-card__rating">
        <img
          src={`/images/dice/dice-${rating}.png`}
          alt={`Rated ${rating} out of 6`}
          width={36}
          height={36}
        />
      </span>
      <div className="content">
        <h4>Interstellar: Film Review</h4>
        <p>Christopher Nolan aims for the stars in this brainy and gargantuan sci-fi epic</p>
        <h5>By <span>Chengcheng Teng</span></h5>
      </div>
    </Link>
  )
}