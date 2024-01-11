import { useContext, useState } from "react";
import "./FilterTools.css";
import { ProductsContext } from "../../Contexts/ProductsContext/ProductsContext";

function FilterTools({ cat, results, changeCat }) {
  const { products, setProducts } = useContext(ProductsContext);
  const [sortedBy, setSortedBy] = useState("");

  function handleSort(e) {
    const sortCondition = e.target.value;
    setSortedBy(sortCondition);
    const sorted = [...products];
    if (sortCondition === "price ascending") {
      sorted.sort((product1, product2) => product1.price - product2.price);
      console.log(sorted);
    } else if (sortCondition === "price descending") {
      sorted.sort((product1, product2) => product2.price - product1.price);
      console.log(sorted);
    } else if (sortCondition === "date ascending") {
      sorted.sort(
        (product1, product2) =>
          new Date(product1.uploadDate) - new Date(product2.uploadDate)
      );
      console.log(sorted);
    } else if (sortCondition === "date descending") {
      sorted.sort(
        (product1, product2) =>
          new Date(product2.uploadDate) - new Date(product1.uploadDate)
      );
      console.log(sorted);
    }
    setProducts(sorted);
  }

  return (
    <div id="filter-tools">
      {results !== 0 && cat && cat !== "All" && (
        <span>
          {results} results for {cat}
        </span>
      )}

      <div className="tools">
        <select name="sort" id="sort" value={sortedBy} onChange={handleSort}>
          <option value="">sort</option>
          <option value="price ascending">price ascending</option>
          <option value="price descending">price descending</option>
          <option value="date ascending">date ascending</option>
          <option value="date descending">date descending</option>
        </select>
        <select
          name="filter"
          id="filter"
          value={cat}
          onChange={(e) => {
            changeCat(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="Beauty">Beauty</option>
          <option value="Technology">Technology</option>
          <option value="Guns">Guns</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
    </div>
  );
}

export default FilterTools;
