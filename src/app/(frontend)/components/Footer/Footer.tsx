import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <p>Rulletekst - The film ends. The conversation begins.</p>
          <p className="copyright">© {new Date().getFullYear()} Rulletekst. All rights reserved.</p>
        </div>
        <ul>
          <li>contact@rulletekst.xxx</li>
          <li>+47 999 99 xxx</li>
          <li>rulletekst.vercel.app</li>
        </ul>
      </div>
    </footer>
  );
}
