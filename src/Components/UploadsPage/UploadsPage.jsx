import { useEffect, useState } from "react";
import "./UploadsPage.css";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import { deleteSingleProduct, getUploads } from "../../Utils/api";

function UploadsPage() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUploads()
      .then((data) => {
        setUploads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function handleDelete(e, id) {
    e.preventDefault();
    e.stopPropagation();

    deleteSingleProduct(id)
      .then(() => {
        return getUploads();
      })
      .then((data) => {
        setUploads(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="my-uploads">
      <div className="uploads-add-div">
        <h1>My Uploads</h1>
        <Link to={"/add-new-product"} className="add-new-prod-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="loading-info">
          <h1>Loading...</h1>
        </div>
      ) : uploads.length === 0 ? (
        <div className="no-uploads-info">
          <h1>No uploads found</h1>
        </div>
      ) : (
        <div className="product-list-uploads">
          {uploads.map((upload) => (
            <Link to={`/product/${upload._id}`} key={upload._id}>
              <Product
                product={upload}
                page="uploads"
                handleDelete={handleDelete}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UploadsPage;
