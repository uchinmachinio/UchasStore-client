import Categories from "../Categories/Categories";
import FilterTools from "../FilterTools/FilterTools";
import "./ProductPage.css";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../Contexts/ProductsContext/ProductsContext";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import { getProducts } from "../../Utils/api";
import PageSlider from "../PageSlider/PageSlider";

function ProductPage({ searchText, openAuthForm }) {
  const { products, setProducts } = useContext(ProductsContext);

  const [activePage, setActivePage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [category, setCategory] = useState("");
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    getProducts(activePage, category, searchText)
      .then((data) => {
        setNumberOfPages(data.numberOfPages);
        setProducts(data.products);
        setNumberOfProducts(data.productCount);
      })
      .catch((err) => console.log(err));
  }, [activePage, category, searchText]);

  function changePage(page) {
    setActivePage(page);
  }

  function goToNextPage() {
    setActivePage((p) => p + 1);
  }

  function goToPrevPage() {
    setActivePage((p) => p - 1);
  }

  function changeCat(cat) {
    setCategory(cat);
    setActivePage(1);
  }

  return (
    <>
      <FilterTools
        cat={category}
        results={numberOfProducts}
        changeCat={changeCat}
      />
      <div id="main-div">
        <div>
          <Categories activePage={activePage} changeCat={changeCat} />
        </div>
        <div>
          {products.length === 0 && category === "" && (
            <h1 className="result">Loading...</h1>
          )}
          {products.length === 0 && category !== "" ? (
            <h1 className="result">no results for {category}</h1>
          ) : (
            <div className="product-list">
              {products.map((upload) => (
                <Link to={`/product/${upload._id}`} key={upload._id}>
                  <Product product={upload} openAuthForm={openAuthForm} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {numberOfProducts !== 0 && (
        <PageSlider
          numberOfPages={numberOfPages}
          activePage={activePage}
          changePage={changePage}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
        />
      )}
    </>
  );
}

export default ProductPage;
