import "server-only";

import { createHash } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import type { FilmNight } from "@/payload-types";

export const reservationCookie = "reservation-token";
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const getReservedFilms = cache(async () => {
  const token = (await cookies()).get(reservationCookie)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return [];

  const payload = await getPayload({ config });
  // Access is granted only for this private token; attendee details never reach the browser.
  const { docs } = await payload.find({
    collection: "reservations",
    overrideAccess: true,
    where: { visitorHash: { equals: hashToken(token) } },
    select: { filmNight: true },
    populate: { "film-nights": { title: true, slug: true, "event-date": true } },
    depth: 1,
    pagination: false,
  });
  return docs.map(doc => doc.filmNight).filter((film): film is FilmNight => typeof film === "object" && film !== null);
});
