import type { ReactNode } from "react";
import Link from "next/link";
import "./CardRow.css";

type CardRowProps = {
  title: string;
  href: string;
  children: ReactNode;
};

export default function CardRow({ title, href, children }: CardRowProps) {
  return (
    <section className="card-row">
      <Link className="card-row__link" href={href}>
        <h3>{title}</h3>
        <span>≻</span>
      </Link>
      <div>
        {children}
      </div>
    </section>
  )
}
