import Link from "next/link";
import HeaderTickets from "./HeaderTickets";
import HeaderNav from "./HeaderNav";
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
      <HeaderNav>
        <ul>
          <li><Link href="/articles">Articles</Link></li>
          <li><Link href="/film-reviews">Reviews</Link></li>
          <li><a href="/#film-nights">Film Nights</a></li>
          <li><HeaderTickets /></li>
        </ul>
      </HeaderNav>
    </header>
  )
}
