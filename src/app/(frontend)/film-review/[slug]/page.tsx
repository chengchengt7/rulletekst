import "./page.css";

const galleryRows = [
  ["17.08.07", "17.09.24", "17.10.00", "17.11.08", "17.14.04", "17.15.14"],
  ["17.08.32", "17.10.30", "17.11.44", "17.14.25", "17.16.02", "17.17.18"],
];

type ReviewCardProps = {
  rating?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function ReviewPage({ rating = 3 }: ReviewCardProps) {
  return (
    <div className="review-page">
      <div className="review-hero">
        <img src="/intersteller/Intersteller.png" alt="" />
      </div>

      <div className="container">
        <h1 className="review-title">Interstellar</h1>
        <section className="film-facts">
          <dl className="film-info">
            <div>
              <dt><h5>Director</h5></dt>
              <dd>Christopher Nolan</dd>
            </div>
            <div>
              <dt><h5>Duration</h5></dt>
              <dd>169 minutes</dd>
            </div>
            <div>
              <dt><h5>Age rating</h5></dt>
              <dd>12A (UK cinema)</dd>
            </div>
            <div className="cast">
              <dt><h5>Main actors</h5></dt>
              <dd>
                <span>Matthew McConaughey</span>
                <span>Anne Hathaway</span>
                <span>Jessica Chastain</span>
                <span>Michael Caine</span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="review">
          <div>
            <div className="title-dice">
              <h2 id="review-title">The distance between us</h2>
              <img
                src={`/images/dice-gold/dice-${rating}.png`}
                alt={`Rated ${rating} out of 6`}
                width={36}
                height={36}
              />
            </div>
            <p className="review-sub">Christopher Nolan reaches for the stars, but the moments that stay with us happen much closer to home.</p>
          </div>
          <p>Interstellar reaches across galaxies, but its strongest moments begin with a familiar fear: missing the lives of the people you love. Christopher Nolan builds an enormous adventure around Cooper, a former pilot who leaves his children to search for a future beyond a dying Earth. The mission is extraordinary. The guilt he carries is painfully ordinary.</p>
          <p>Matthew McConaughey makes that tension convincing. His confidence gives Cooper the presence of someone you would follow into space; his vulnerability makes the cost of that journey matter. A sequence of messages from home is more affecting than almost any of the film’s grand revelations. Time becomes something you can see on a face.</p>
          <p>The spectacle is remarkable. Distant worlds feel both beautiful and unwelcoming, while the cramped spacecraft keep the journey grounded. Hans Zimmer’s organ-led score lends these images a powerful sense of urgency, although the music sometimes insists on an emotion before the scene has earned it.</p>
          <p>The writing can be equally forceful. Characters explain ideas and feelings that might have landed more naturally through silence. Anne Hathaway and Jessica Chastain bring conviction to their roles, but the elaborate final stretch occasionally makes them feel caught inside the machinery of Nolan’s puzzle.</p>
          <p>Still, the film’s ambition is compelling. Its explanations may not persuade everyone, yet its emotional question remains clear: what happens to a promise when keeping it takes a lifetime? Interstellar is uneven, sincere, and often moving. Long after its cosmic mysteries fade, the ache of leaving someone behind remains.</p>
        </section>
      </div>

      <section className="gallery">
        {galleryRows.map((row, index) => (
          <div className="gallery-row" key={index}>
            {row.map((time) => (
              <img
                key={time}
                src={`/intersteller/Screenshot 2026-11-17 at ${time}.png`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}
