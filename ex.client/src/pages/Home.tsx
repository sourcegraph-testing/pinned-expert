import { createRef, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Button, CategoriesList, Input, ProductsList } from "../components";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Categories } from "../utils";
import { Loading } from "./Loading";
import { Product, Category } from '@expert/common';

export const Home: React.FC = () => {
  const searchRef = createRef<HTMLInputElement>();
  const [filteredList, setFilteredList] = useState<Product[]>([]);

  const goTo = useNavigate();

  const { user } = useAuth();
  const { products } = useProducts();

  useEffect(() => {
    if (!products) return;

    setFilteredList(products);
  }, [products, user]);

  const filterList = () => {
    const filteredProducts = products.filter(
      (item) =>
        item.name.indexOf(searchRef.current!.value) !== -1 ||
        item.nameVariation.find(
          (variation) => variation.indexOf(searchRef.current!.value) !== -1
        )
    );

    setFilteredList(filteredProducts);
  };

  const isProductFound = () => {
    return Boolean(filteredList?.length);
  };

  const filterByCategory = (category: Category | null) => {
    const filteredProducts = !category
      ? []
      : products.filter((product) => product.category.includes(category));

    setFilteredList(filteredProducts);
  };

  if (!products) return <Loading />;
  return (
    <div className="App">
      <header>
        <h1>this is expert</h1>
        <h3>expiry dates by the experts</h3>
      </header>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          return (
            isProductFound() || goTo(`/products/${searchRef.current!.value}`)
          );
        }}
      >
        <Input
          type="search"
          name="search"
          ref={searchRef}
          placeholder="search for an item"
          onChange={filterList}
        />
        <Button type="submit">
          <BiSearchAlt2 />
        </Button>
      </form>
      <CategoriesList
        categories={[...Categories, { name: null, icon: "🗑️" }]}
        onClick={filterByCategory}
        group="category"
        design="compact"
      />
      <ProductsList list={filteredList} />
    </div>
  );
};
