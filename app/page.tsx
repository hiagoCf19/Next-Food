
import Header from "./components/Header";
import CategoryList from "./components/category-list";
import Search from "./components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>


    </>

  );
}
