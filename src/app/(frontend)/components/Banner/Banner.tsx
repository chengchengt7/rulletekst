import "./Banner.css";
import Link from "next/link";

export default function Banner() {
  return (
    <article className="film-night-banner">
      <div className="poster">
        <img src="/farewell-my-concubine.webp" alt="film poster" />
      </div>
      <div className="content">
        <h5>Next film night</h5>
        <h2>Farewell My Concubine</h2>
        <p className="description">
          Join us for Chen Kaige's <i>Farewell My Concubine</i>, followed by a conversation about love, identity, and the blurred lines between art and life.
        </p>
      </div>
      <Link className="explore" href="/film-nights/farewell-my-concubine">
        <time dateTime="2026-11-29">Nov 29th, 2026</time>
        <h3>View<br />details<br /><span className="arrow">→</span></h3>
      </Link>
    </article>
  )
}
