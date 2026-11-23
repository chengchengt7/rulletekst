import type { Media, SloganBlock } from "@/payload-types";
import Gallery from "../Gallery/Gallery";
import "./Slogan.css";

export default function Slogan({ block, images }: { block: SloganBlock; images: Media[] }) {
  return (
    <section className="slogan">
      <Gallery images={images} background />
      <h1>{block.slogan}</h1>
    </section>
  );
}
