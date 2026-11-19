import "./page.css";


export default async function FilmNight({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="film-night">
      <img className="film-night-hero" src="/film1-wide.png" alt="" />
      <h1>Farewell my concubine</h1>
      <div className="container">
        <div className="content">
          <dl className="film-info">
            <div>
              <dt>
                <h5>Director</h5>
              </dt>
              <dd>director</dd>
            </div>
            <div>
              <dt>
                <h5>Duration</h5>
              </dt>
              <dd>169 minutes</dd>
            </div>
            <div>
              <dt>
                <h5>Age rating</h5>
              </dt>
              <dd>13</dd>
            </div>
          </dl>
          <p>
            Join us for Chen Kaige's Farewell My Concubine, followed by a
            conversation about love, identity, and the blurred lines between art
            and life.
          </p>
          <dl className="film-nights-facts">
            <div>
              <dt>
                <h5>Where</h5>
              </dt>
              <dd>Trondheimsveien 2K, Bygg K, 0560 Oslo</dd>
            </div>
            <div>
              <dt>
                <h5>When</h5>
              </dt>
              <dd>
                Nov 29th, 2026 Sunday
              </dd>
            </div>
            <div>
              <dt>
                <h5>Agenda</h5>
              </dt>
              <dd>
                18:00 door opens, 18:30 film starts, 22:00 door closes.
              </dd>
            </div>
            <div>
              <dt>
                <h5>Ticket</h5>
              </dt>
              <dd>
                50 kr per person. Your contribution goes towards drinks and
                general maintenance, helping us keep these evenings going.
              </dd>
            </div>
          </dl>
        </div>
        <form className="form">
          <h5>Join the film night</h5>
          <p>Sunday Nov 29th, 2026 · Film starts 18:30 </p>
          <p>50 kr per person · Pay at the door</p>
          <label>
            <span>Name</span>
            <input type="text" required></input>
          </label>
          <label>
            <span>E-mail</span>
            <input type="email" required></input>
          </label>
          <label>
            <span>Age</span>
            <input type="number" required></input>
          </label>
          <button type="submit" className="button">
            Reserve my seat
          </button>
          <p>No online payment required.</p>
        </form>
      </div>
    </div>
  );
}
