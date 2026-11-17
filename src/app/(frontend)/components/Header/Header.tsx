import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link href="/"><h2>Rulletekst</h2></Link>
      <nav>
        <ul>
          <li><Link href="./articles">Articles</Link></li>
          <li><Link href="./reviews">Reviews</Link></li>
          <li><a href="/#film-nights">Film Nights</a></li>
          <li><Link href="#">Ticket</Link></li>
          </ul>
        </nav>
    </header>
  )
}
