import FilmNightCard from "../FilmNightCard/FilmNightCard";
import { getPayload } from "payload";
import config from "@payload-config";
import type { FilmNight, FilmNightsBlock } from "@/payload-types";
import "./FilmNights.css";

export default async function FilmNights({ block }: { block: FilmNightsBlock }) {
  const payload = await getPayload({ config });
  const { docs: hosts } = await payload.find({
    collection: "users",
    where: { name: { equals: "Chengcheng Teng" } },
    select: { name: true, avatar: true },
    depth: 1,
    limit: 1,
  });
  const filmNights = block.filmNights as FilmNight[];
  const avatar = hosts[0]?.avatar;
  const hostAvatar = avatar && typeof avatar === "object" ? avatar : null;
  const name = hosts[0]?.name;

  return (
    <section id="film-nights" className="film-nights">
      <div className="container">
        <h3>Film Nights</h3>
        <div className="content">
          <div className="film-nights-intro">
            <p>
              Come for the cinema, stay for the company. Our film nights bring
              curious people together for stories that linger long after the
              credits. Discover a new favourite, revisit a classic, or simply
              enjoy an evening away from your own screen. Come on your own or
              bring a friend — welcome!
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
                  <h5>Agenda</h5>
                </dt>
                <dd>18:00 door opens, 18:30 film starts, 22:00 door closes.</dd>
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

            <div className="film-nights-host">
              {hostAvatar?.url && (
                <img src={hostAvatar.url} alt="Chengcheng Teng" />
              )}
              <div>
                <h5>Hosted by {name}</h5>
              </div>
            </div>
          </div>
          <div className="card-grid">
            {filmNights.map((filmNight) => (
              <FilmNightCard key={filmNight.id} filmNight={filmNight} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
