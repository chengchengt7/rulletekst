import "./film-night.css";


export default async function FilmNight({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

 

  return (
    <div className="film-night">
      <img className="film-night-hero" src="/film1-wide.png" alt="" />
      <div className="film-night-details">
        <div className="content">
          <h2>Film Nights</h2>
          <p>Director:</p>
          <time>Nov 29th, 2026</time>
          <p>Location</p>
          <p>Price: 50kr</p>
          <p className="description">
            Join us for Chen Kaige's Farewell My Concubine, followed by a conversation about love, identity, and the blurred lines between art and life.
          </p>
        </div>
        <form className="form">



        </form>
      </div>
    </div>
  )
}
