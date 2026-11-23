import Link from "next/link";
import type { FilmNight, Media } from "@/payload-types";
import "./FilmNightCard.css";

export default function FilmNightCard({ filmNight }: { filmNight: FilmNight }) {
  const photo = filmNight.thumbnail as Media;

  return (
    <article className="film-night-card">
      <img src={photo.url!} alt={photo.alt} />
      <div className="card-content">
        <h5>
          {filmNight["event-date"] ? (
            <time dateTime={filmNight["event-date"]}>
              {new Intl.DateTimeFormat("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Europe/Oslo",
              }).format(new Date(filmNight["event-date"]))}
            </time>
          ) : (
            "Film night"
          )}
        </h5>
        <h3>{filmNight.title}</h3>
        <Link href={`/film-nights/${filmNight.slug}`} className="cta">
          View event
        </Link>
      </div>
    </article>
  );
}
