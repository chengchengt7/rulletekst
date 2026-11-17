import Banner from "./components/Banner/Banner";
import CardRow from "./components/CardRow/CardRow";
import FilmNights from "./components/FilmNights/FilmNights";
import Slogan from "./components/Slogan/Slogan";

export default async function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <Banner />
        <Slogan />
        <CardRow />
        <CardRow />
      </div>
      <FilmNights />

    </div>
  )
}
