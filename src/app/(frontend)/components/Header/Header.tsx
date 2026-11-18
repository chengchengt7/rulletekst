import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link href="/" className="header-brand">
        <h2>
          <span className="header-brand__text">
            Rulletekst
            <span className="header-brand__copy" aria-hidden="true">Rulletekst</span>
          </span>
        </h2>
      </Link>
      <nav>
        <ul>
          <li><Link href="/articles">Articles</Link></li>
          <li><Link href="/film-reviews">Reviews</Link></li>
          <li><a href="/#film-nights">Film Nights</a></li>
          <li><Link href="#">Ticket</Link></li>
          </ul>
        </nav>
    </header>
  )
}
