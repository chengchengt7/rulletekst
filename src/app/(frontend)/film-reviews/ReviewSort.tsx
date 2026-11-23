"use client";

import { useRouter } from "next/navigation";

export default function ReviewSort({ sort }: { sort: string }) {
  const router = useRouter();

  return (
    <div className="reviews-sort">
      <label htmlFor="review-sort">Sort by</label>
      <span className="sort-select">
        <select
          id="review-sort"
          name="sort"
          value={sort}
          onChange={(event) => router.push(`/film-reviews?sort=${event.target.value}`, { scroll: false })}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Film title A-Z</option>
        </select>
      </span>
    </div>
  );
}
