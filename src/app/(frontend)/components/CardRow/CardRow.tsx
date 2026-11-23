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
      <div className="card-row__heading">
        <h3>{title}</h3>
        <Link className="card-row__link" href={href}>
          View all {title.toLowerCase()}
        </Link>
      </div>
      <div>
        {children}
      </div>
    </section>
  )
}
