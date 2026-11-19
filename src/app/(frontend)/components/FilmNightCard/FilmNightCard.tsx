import Link from "next/link";
import "./FilmNightCard.css";
import ArrowIcon from "../ArrowIcon";

export default function FilmNightCard() {
  return (
    <Link href="#" className="film-night-card">
      <img src="1.webp" alt="" />
      <div className="card-content">
        <h5>Nov 29th, 2026 | Sunday</h5>
        <h3>Farewell my concubine</h3>
        <div className="cta">
          <h5>View details</h5>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
}