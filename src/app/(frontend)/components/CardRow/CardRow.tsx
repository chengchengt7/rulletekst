import ArticleCard from "../ArticleCard/ArticleCard";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./CardRow.css";

export default function CardRow() {
  return (
    <section className="card-row">
      <div>
        <h3>Articles</h3>
        <p>≻</p>
      </div>
      <div>
        <ArticleCard />
        <ArticleCard />
        <ReviewCard rating={5} />
        <ReviewCard rating={2} />
        <ReviewCard rating={2} />
      </div>
    </section>
  )
}