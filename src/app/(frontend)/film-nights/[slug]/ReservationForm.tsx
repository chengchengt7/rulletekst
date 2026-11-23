"use client";

import { useActionState } from "react";
import { reserveSeat } from "./actions";

export default function ReservationForm({ filmNight, title, date, reserved }: {
  filmNight: number; title: string; date: string | null; reserved: boolean;
}) {
  const [state, action, pending] = useActionState(reserveSeat.bind(null, filmNight), { error: "", success: false });

  if (reserved || state.success) {
    return (
      <section className="form" role="status">
        <h5>Your seat is reserved</h5>
        <p>{title}</p>
        <p>{date && `${date} · `}Film starts 18:30</p>
        <p>Find your reservation under Ticket in the header. Pay 50 kr at the door.</p>
      </section>
    );
  }

  return (
    <form className="form" action={action}>
      <h5>Join the film night</h5>
      <p>{date && `${date} · `}Film starts 18:30</p>
      <p>50 kr per person · Pay at the door</p>
      <label>
        <span>Name</span>
        <input name="name" autoComplete="name" defaultValue={state.values?.name} required />
      </label>
      <label>
        <span>E-mail</span>
        <input name="email" type="email" autoComplete="email" defaultValue={state.values?.email} required />
      </label>
      <label>
        <span>Age</span>
        <input name="age" type="number" min={0} step={1} defaultValue={state.values?.age} required aria-describedby={state.error ? "reservation-error" : undefined} />
      </label>
      {state.error && <p id="reservation-error" role="alert">{state.error}</p>}
      <button type="submit" className="button" disabled={pending}>{pending ? "Booking…" : "Book a seat"}</button>
      <p>No online payment required.</p>
    </form>
  );
}
