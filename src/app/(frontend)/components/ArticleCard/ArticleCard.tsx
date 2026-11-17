import Link from "next/link";
import "./ArticleCard.css";

export default function ArticleCard() {
  return (
    <Link href="/articles/abc" className="article-card">
      <img src="article.jpg" alt="" />
      <div className="content">
        <h4>
          UK-Ireland box office for 2026 passes totals of every post-pandemic year
        </h4>
        <h5>By <span>Chengcheng Teng</span></h5>
      </div>
    </Link>
  )
}