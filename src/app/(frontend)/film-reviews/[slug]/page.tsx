import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import type { Actor, Director, Media, Rating, RatingBlock, User } from "@/payload-types";
import "./page.css";

export default async function ReviewPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "reviews",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    populate: { users: { name: true, avatar: true } },
  });
  const review = docs[0];
  if (!review) notFound();

  const hero = review.heroPhoto as Media;
  const director = review.director as Director;
  const ageRating = review.ratingBlock as RatingBlock;
  const rating = review["reivew-rating"] as Rating;
  const journalist = review.journalist as User;
  const avatar = journalist.avatar as Media;
  const actors = review.actors as Actor[];
  const gallery = review.gallery as Media[];
  const middle = Math.ceil(gallery.length / 2);
  const galleryRows = [gallery.slice(0, middle), gallery.slice(middle)].filter(row => row.length);

  return (
    <div className="review-page">
      <div className="review-hero">
        <img src={hero.url!} alt={hero.alt} />
      </div>

      <div className="container">
        <h1 className="review-title">{review.title}</h1>
        <section className="film-facts">
          <dl className="film-info">
            <div>
              <dt><h5>Director</h5></dt>
              <dd>{director.title}</dd>
            </div>
            <div>
              <dt><h5>Duration</h5></dt>
              <dd>{review.duration} minutes</dd>
            </div>
            <div>
              <dt><h5>Age rating</h5></dt>
              <dd>{ageRating.title}</dd>
            </div>
            <div className="cast">
              <dt><h5>Main actors</h5></dt>
              <dd>
                {actors.map((actor) => (
                  <span key={actor.id}>{actor.title}</span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <section className="review">
          <div>
            <div className="title-dice">
              <h2 id="review-title">{review["review-title"]}</h2>
              <img
                src={`/images/dice-accent/dice-${rating.title}.png`}
                alt={`Rated ${rating.title} out of 6`}
                width={36}
                height={36}
              />
            </div>
            <p className="review-sub">{review["sub-title"]}</p>
          </div>
          <RichText data={review["review-body"]} />
          <div className="journalist">
            <img src={avatar.url!} alt={avatar.alt} width={48} height={48} />
            <h5>By {journalist.name}</h5>
          </div>
        </section>
      </div>

      <section className="gallery">
        {galleryRows.map((row, index) => (
          <div className="gallery-row" key={index}>
            {row.map((image) => (
              <img key={image.id} src={image.url!} alt={image.alt} loading="lazy" decoding="async" />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
