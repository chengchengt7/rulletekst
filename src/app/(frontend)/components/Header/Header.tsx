import Link from "next/link";
import Image from "next/image";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <img
          src="/rulletekst-logo.png"
          alt="logo"
        />
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
