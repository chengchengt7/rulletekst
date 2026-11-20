import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@payload-config";
import type { Director, Media, RatingBlock } from "@/payload-types";
import ReservationForm from "./ReservationForm";
import { getReservedFilms } from "@/lib/reservations";
import "./page.css";


export default async function FilmNight({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "film-nights",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  const filmNight = docs[0];
  if (!filmNight) notFound();
  const tickets = await getReservedFilms();

  const hero = filmNight.heroPhoto as Media;
  const director = filmNight.director as Director;
  const rating = filmNight.ratingBlock as RatingBlock;
  const eventDate = filmNight["event-date"];
  const dateLabel = eventDate
    ? new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Oslo" }).format(new Date(eventDate))
    : null;

  return (
    <div className="film-night">
      <img className="film-night-hero" src={hero.url!} alt={hero.alt} />
      <h1>{filmNight.title}</h1>
      <div className="container">
        <div className="content">
          <dl className="film-info">
            <div>
              <dt>
                <h5>Director</h5>
              </dt>
              <dd>{director.title}</dd>
            </div>
            <div>
              <dt>
                <h5>Duration</h5>
              </dt>
              <dd>{filmNight.duration} minutes</dd>
            </div>
            <div>
              <dt>
                <h5>Age rating</h5>
              </dt>
              <dd>{rating.title}</dd>
            </div>
          </dl>
          <RichText data={filmNight.description} />
          <dl className="film-nights-facts">
            {eventDate && (
              <div>
                <dt><h5>When</h5></dt>
                <dd><time dateTime={eventDate}>{dateLabel}</time></dd>
              </div>
            )}
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
        <ReservationForm
          filmNight={filmNight.id}
          title={filmNight.title}
          date={dateLabel}
          reserved={tickets.some(ticket => ticket.id === filmNight.id)}
        />
      </div>
    </div>
  );
}
