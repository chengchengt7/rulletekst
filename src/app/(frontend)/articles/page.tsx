import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import "./page.css";

export const metadata = { title: "Articles | Rulletekst" };

export default async function ArticlesPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "articles", sort: "-publishedAt", depth: 1, limit: 100 });
  return (
    <div className="articles-page container">
      <h1>Articles</h1>
      {docs.length ? <div className="articles-grid">{docs.map((article) => <ArticleCard key={article.id} article={article} />)}</div> : <p>Our first story is on its way. <Link href="/">Back to the cinema.</Link></p>}
    </div>
  );
}
