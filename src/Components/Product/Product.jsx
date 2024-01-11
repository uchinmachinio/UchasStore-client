import "./Product.css";
import sellerImage from "../../assets/defaultuserimage.png";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import ImageSlider from "../ImageSlider/ImageSlider";

function Product({
  product,
  page,
  quantity,
  handleDelete,
  updateCart,
  deleteFromCart,
  openAuthForm,
}) {
  const { userInfo } = useContext(UserContext);
  let style = "product";

  if (page === "single") {
    style += "-single";
  } else if (page === "cart") {
    style += "-cart";
  }

  const locale = navigator.language;
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const date = new Date(product.uploadDate);

  const formatedDate = new Intl.DateTimeFormat(locale, options).format(date);

  function handleCartButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (Object.keys(userInfo).length === 0) {
      openAuthForm();
      return;
    }

    const storedCartData = localStorage.getItem("cart");
    const cart = JSON.parse(storedCartData) || [];
    console.log(cart);

    const ids = cart.map((prod) => {
      return prod.product._id;
    });

    if (ids.includes(product._id)) {
      const productToUpdate = cart.find(
        (prod) => prod.product._id === product._id
      );
      productToUpdate.quantity += 1;
    } else {
      const newCartItem = {
        product: product,
        quantity: 1,
      };
      cart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }

  function handleQuantityChange(e) {
    const newQuantity = Number(e.target.value);
    updateCart(product, newQuantity);
  }

  return (
    <>
      <div className={style}>
        <ImageSlider images={product.images} />
        <div className="product-info">
          <div className="seller-info">
            <div className="seller">
              <img src={sellerImage} alt="" />
              <span>{product.sellerName}</span>
            </div>

            {page && page !== "uploads" && (
              <div className="date">{formatedDate}</div>
            )}
          </div>

          <div className="name">
            <h3>{product.name}</h3>
          </div>
          {page === "cart" && (
            <div className="description">
              <h4>description:</h4>
              {product.description}
            </div>
          )}
          {page && page !== "uploads" && (
            <div className="location">ships from: {product.location}</div>
          )}
          <div className="price-cart">
            <span className="price">{product.price} $</span>

            {page === "cart" && (
              <div>
                <input
                  className="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
                <button
                  onClick={(e) => {
                    deleteFromCart(e, product._id);
                  }}
                >
                  delete
                </button>
              </div>
            )}

            {page !== "uploads" && page !== "cart" && (
              <button
                className="add-to-cart-btn"
                onClick={handleCartButtonClick}
                style={{
                  visibility:
                    userInfo.username === product.sellerName && "hidden",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                </svg>
              </button>
            )}

            {page === "uploads" && (
              <div className="product-buttons">
                <button
                  onClick={(e) => {
                    handleDelete(e, product._id);
                  }}
                >
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {page === "single" && (
        <div className="description-single">
          <h3>description:</h3> {product.description}
        </div>
      )}
    </>
  );
}

export default Product;
