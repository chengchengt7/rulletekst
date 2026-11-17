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
      <img src="/intersteller/Intersteller.png" alt="" />

      <div className="container">
        <div className="review-title">
          <h1>Interstellar</h1>
        </div>
        
        <section className="film-facts">
          <div className="poster">
            <img src="/intersteller/!.jpg" alt="Interstellar film poster" />
          </div> 
          <table className="table">
            <tbody>
              <tr>
                <th id="film-director" scope="col">Director</th>
                <th id="film-category" scope="col">Category</th>
              </tr>
              <tr>
                <td headers="film-director">Christopher Nolan</td>
                <td headers="film-category">Science fiction, Drama</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th id="film-duration" scope="col">Duration</th>
                <th id="film-age-rating" scope="col">Age rating</th>
              </tr>
              <tr>
                <td headers="film-duration">169 minutes</td>
                <td headers="film-age-rating">12A (UK cinema)</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th id="film-actors" colSpan={2} scope="colgroup">Main actors</th>
              </tr>
              <tr>
                <td headers="film-actors" colSpan={2}>
                  <div className="film-cast">
                    <span>Matthew McConaughey</span>
                    <span>Anne Hathaway</span>
                    <span>Jessica Chastain</span>
                    <span>Michael Caine</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="review">
          <div className="header">
            <div>
              <h2 id="review-title">The distance between us</h2>
              <img
                src={`/images/dice/dice-${rating}.png`}
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
