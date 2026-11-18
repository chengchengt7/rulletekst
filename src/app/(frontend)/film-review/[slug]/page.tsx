import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
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

  const hero = typeof review.heroPhoto === "object" ? review.heroPhoto : null;
  const director = typeof review.director === "object" ? review.director : null;
  const ageRating = typeof review.ratingBlock === "object" ? review.ratingBlock : null;
  const rating = typeof review["reivew-rating"] === "object" ? review["reivew-rating"].title : null;
  const journalist = typeof review.journalist === "object" ? review.journalist : null;
  const avatar = typeof journalist?.avatar === "object" ? journalist.avatar : null;
  const gallery = (review.gallery ?? [])
    .filter((image) => typeof image === "object")
    .filter((image) => image.url);
  const middle = Math.ceil(gallery.length / 2);

  return (
    <div className="review-page">
      {hero?.url && (
        <div className="review-hero">
          <img src={hero.url} alt={hero.alt} />
        </div>
      )}

      <div className="container">
        <h1 className="review-title">{review.title}</h1>
        <section className="film-facts">
          <dl className="film-info">
            <div>
              <dt><h5>Director</h5></dt>
              <dd>{director?.title}</dd>
            </div>
            <div>
              <dt><h5>Duration</h5></dt>
              <dd>{review.duration} minutes</dd>
            </div>
            <div>
              <dt><h5>Age rating</h5></dt>
              <dd>{ageRating?.title}</dd>
            </div>
            <div className="cast">
              <dt><h5>Main actors</h5></dt>
              <dd>
                {review.actors.map((actor) => (
                  typeof actor === "object" && <span key={actor.id}>{actor.title}</span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <section className="review">
          <div>
            <div className="title-dice">
              <h2 id="review-title">{review["review-title"]}</h2>
              {rating != null && Number.isInteger(rating) && rating >= 1 && rating <= 6 && (
                <img
                  src={`/images/dice-gold/dice-${rating}.png`}
                  alt={`Rated ${rating} out of 6`}
                  width={36}
                  height={36}
                />
              )}
            </div>
            <p className="review-sub">{review["sub-title"]}</p>
          </div>
          <RichText data={review["review-body"]} />
          {journalist && (
            <div className="journalist">
              {avatar?.url && <img src={avatar.url} alt={avatar.alt} width={48} height={48} />}
              {journalist.name && <h5>By {journalist.name}</h5>}
            </div>
          )}
        </section>
      </div>

      {gallery.length > 0 && (
        <section className="gallery">
          {[gallery.slice(0, middle), gallery.slice(middle)].filter((row) => row.length > 0).map((row, index) => (
            <div className="gallery-row" key={index}>
              {row.map((image) => (
                <img key={image.id} src={image.url!} alt={image.alt} loading="lazy" decoding="async" />
              ))}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
