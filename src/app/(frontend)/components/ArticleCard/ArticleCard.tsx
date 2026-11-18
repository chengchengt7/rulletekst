import Link from "next/link";
import type { Article, Media, User } from "@/payload-types";
import "./ArticleCard.css";

export default function ArticleCard({ article }: { article: Article }) {
  const image = article.heroPhoto as Media;
  const author = article.journalist as User;
  return (
    <Link href={`/articles/${article.slug}`} className="article-card">
      {image?.url && <img src={image.url} alt={image.alt} loading="lazy" />}
      <div className="content">
        <p className="article-card__category">{article.category || "Cinema & Culture"}</p>
        <h4>{article.title}</h4>
        <h5>By <span>{author?.name || "Rulletekst"}</span></h5>
      </div>
    </Link>
  );
}
