import "./Banner.css";
import Link from "next/link";
import { getPayload } from "payload";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import config from "@payload-config";
import type { Media } from "@/payload-types";
import ArrowIcon from "../ArrowIcon";

export default async function Banner() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "film-nights",
    sort: "event-date",
    limit: 1,
    depth: 1,
  });
  const filmNight = docs[0];
  if (!filmNight) return null;

  const photo = filmNight.ticketPhoto as Media;
  const date = filmNight["event-date"];
  const description = convertLexicalToPlaintext({ data: filmNight.description }).split("\n")[0];

  return (
    <article className="film-night-banner">
      <div className="poster">
        <img src={photo.url!} alt={photo.alt} />
      </div>
      <div className="content">
        <h5>Next film night</h5>
        <h2>{filmNight.title}</h2>
        <p className="description">{description}</p>
      </div>
      <Link className="explore" href={`/film-nights/${filmNight.slug}`}>
        {date && (
          <time dateTime={date}>
            {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Oslo" }).format(new Date(date))}
          </time>
        )}
        <h3>View<br />details<br /><ArrowIcon /></h3>
      </Link>
    </article>
  )
}
