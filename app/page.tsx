
import Header from "./components/header/Header";
import Search from "./components/header/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

    </>

  );
}
