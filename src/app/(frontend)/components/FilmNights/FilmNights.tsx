import FilmNightCard from "../FilmNightCard/FilmNightCard";
import "./FilmNights.css";

export default function FilmNights() {
  return(
    <section id="film-nights" className="film-nights">
      <h3>Film Nights</h3>
      <div className="film-nights-content">
        <p>
          Great films, good company, and stories that stay with you. Join our film nights to discover something unexpected, share your thoughts, or simply settle in and enjoy. Everyone's welcome—bring your curiosity.
        </p>
        <div className="card-grid">
          <FilmNightCard />
          <FilmNightCard />
          <FilmNightCard />
          <FilmNightCard />
        </div>
      </div>

    </section>
  )
}