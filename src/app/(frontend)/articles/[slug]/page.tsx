import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@payload-config";
import type { Media, User } from "@/payload-types";
import "./page.css";

export default async function ArticlePage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    populate: { users: { name: true } },
  });
  const article = docs[0];
  if (!article) notFound();

  const hero = article.heroPhoto as Media;
  const author = article.journalist as User;
  const { docs: related } = await payload.find({
    collection: "articles",
    where: { id: { not_equals: article.id } },
    sort: "-publishedAt",
    limit: 3,
    depth: 1,
    populate: { users: { name: true } },
  });

  return (
    <article className="article-page container">
      <div className="article-heading">
        <p className="article-category">{article.category || "Cinema & Culture"}</p>
        <h1>{article.title}</h1>
        <p className="article-deck">{article["sub-title"]}</p>
        <div className="article-meta">
          <span>By {author?.name || "Rulletekst"}</span>
          {article.publishedAt && <time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" }).format(new Date(article.publishedAt))}</time>}
        </div>
      </div>

      {hero?.url && (
        <figure className="article-hero">
          <img src={hero.url} alt={hero.alt} width={hero.width ?? undefined} height={hero.height ?? undefined} fetchPriority="high" />
          <figcaption>{hero.alt}</figcaption>
        </figure>
      )}

      <RichText className="article-body" data={article["review-body"]} />

      <section className="article-related" aria-labelledby="keep-reading">
        <h2 id="keep-reading">Keep reading</h2>
        {related.length ? (
          <div className="article-related-grid">
            {related.map((item) => {
              const photo = item.heroPhoto as Media;
              return (
                <Link className="article-card" href={`/articles/${item.slug}`} key={item.id}>
                  {photo?.url && <img src={photo.url} alt={photo.alt} loading="lazy" />}
                  <div>
                    <p className="article-category">{item.category || "Cinema & Culture"}</p>
                    <h3>{item.title}</h3>
                    <p>{item["sub-title"]}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : <Link className="article-back" href="/articles">Explore all articles</Link>}
      </section>
    </article>
  );
}
