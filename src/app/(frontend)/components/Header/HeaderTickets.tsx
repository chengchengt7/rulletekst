import Link from "next/link";
import { getReservedFilms } from "@/lib/reservations";

export default async function HeaderTickets() {
  const tickets = await getReservedFilms();

  return (
    <details className="header-tickets">
      <summary>Ticket{tickets.length > 0 && ` (${tickets.length})`}</summary>
      <div className="header-tickets-list">
        {tickets.length ? tickets.map(ticket => (
          <Link key={ticket.slug} href={`/film-nights/${ticket.slug}`}>
            <strong>{ticket.title}</strong>
            {ticket["event-date"] && <span>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Oslo" }).format(new Date(ticket["event-date"]))} · 18:30</span>}
            <span>1 seat reserved · 50 kr at the door</span>
          </Link>
        )) : <p>No reserved seats yet.</p>}
      </div>
    </details>
  );
}
