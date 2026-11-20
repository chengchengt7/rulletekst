"use server";

import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPayload, ValidationError } from "payload";
import config from "@payload-config";
import type { RatingBlock } from "@/payload-types";
import { hashToken, reservationCookie } from "@/lib/reservations";

export type ReservationState = {
  error: string; success: boolean;
  values?: { name: string; email: string; age: string };
};

export async function reserveSeat(filmNight: number, _state: ReservationState, form: FormData): Promise<ReservationState> {
  const name = String(form.get("name") ?? "");
  const email = String(form.get("email") ?? "").toLowerCase();
  const ageInput = String(form.get("age") ?? "").trim();
  const age = Number(ageInput);
  const fail = (error: string): ReservationState => ({ error, success: false, values: { name, email, age: ageInput } });
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !ageInput || !Number.isInteger(age) || age < 0 || !Number.isInteger(filmNight) || filmNight < 1) {
    return fail("Please enter a name, valid email, and whole-number age.");
  }

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "film-nights",
    where: { id: { equals: filmNight } },
    depth: 1,
    limit: 1,
  });
  const film = docs[0];
  if (!film) return fail("Film night not found.");

  const rating = (film.ratingBlock as RatingBlock).title;
  const ages = new Map([["G", 0], ["PG", 0], ["PG-13", 13], ["R", 17], ["NC-17", 18]]);
  const minAge = ages.get(rating) ?? (/^\d+\+?$/.test(rating) ? parseInt(rating, 10) : null);
  if (minAge === null) return fail("Please contact the host to confirm the age requirement.");
  if (age < minAge) return fail(`You must be at least ${minAge} to reserve a seat for this film.`);

  const existing = await payload.count({
    collection: "reservations",
    where: { and: [{ email: { equals: email } }, { filmNight: { equals: filmNight } }] },
  });
  const duplicate = fail("This email is already registered for this film night.");
  if (existing.totalDocs) return duplicate;

  const cookieStore = await cookies();
  const savedToken = cookieStore.get(reservationCookie)?.value;
  const token = savedToken && /^[a-f0-9]{64}$/.test(savedToken) ? savedToken : randomBytes(32).toString("hex");
  try {
    // The database also prevents duplicates submitted at the same time.
    await payload.create({ collection: "reservations", overrideAccess: true,
      data: { name, email, age, filmNight, visitorHash: hashToken(token) } });
  } catch (error) {
    if (error instanceof ValidationError) {
      if (error.data.errors.some(field => /unique/i.test(field.message))) return duplicate;
      return fail(error.data.errors.map(field => field.message).join(" "));
    }
    return fail("Could not reserve a seat. Please try again.");
  }

  cookieStore.set(reservationCookie, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/", "layout");
  return { error: "", success: true };
}
