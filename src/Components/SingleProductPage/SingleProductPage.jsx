import { useParams } from "react-router-dom";
import "./SingleProductPage.css";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { getSingleProduct } from "../../Utils/api";

function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSingleProduct(id)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Render a loading state while the product is being fetched
  if (Object.keys(product).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product">
      <Product product={product} page={"single"} />
    </div>
  );
}

export default SingleProductPage;
