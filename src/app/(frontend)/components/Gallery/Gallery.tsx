import type { Media } from "@/payload-types";
import "./Gallery.css";

type GalleryProps = {
  images: Media[];
  background?: boolean;
};

export default function Gallery({ images, background = false }: GalleryProps) {
  const photos = images.filter((image) => image?.url);
  if (!photos.length) return null;

  const middle = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, middle), photos.slice(middle)].filter((row) => row.length);

  return (
    <div className={`gallery${background ? " gallery--background" : ""}`} aria-hidden={background || undefined}>
      {rows.map((row, index) => (
        <div className="gallery-row" key={index}>
          {(background ? row.concat(row) : row).map((image, index) => (
            <img
              key={`${image.id}-${index}`}
              src={image.url!}
              alt={background ? "" : image.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
