import type { ReactNode } from "react";
import Link from "next/link";
import ArrowIcon from "../ArrowIcon";
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
        <ArrowIcon />
      </Link>
      <div>
        {children}
      </div>
    </section>
  )
}
