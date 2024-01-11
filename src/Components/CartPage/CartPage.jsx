import { useEffect, useRef, useState } from "react";
import "./CartPage.css";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import { baseURL, saveCart } from "../../Utils/api";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const divRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0, // Trigger when the div is fully visible
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The top of the viewport touches the div
          divRef.current.classList.add("sticky");
        } else {
          // The div is not intersecting with the viewport
          divRef.current.classList.remove("sticky");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(() => {
    const totalQuantity = cart.reduce((accumulator, prod) => {
      return (accumulator += prod.quantity);
    }, 0);
    setTotalQuantity(totalQuantity);
    const totalCost = cart.reduce((accumulator, prod) => {
      return (accumulator += prod.product.price * prod.quantity);
    }, 0);
    setTotalCost(totalCost);
  }, [cart]);

  function updateCart(product, newQuantity) {
    const newCart = [...cart];
    const productToUpdate = newCart.find(
      (prod) => prod.product._id === product._id
    );
    productToUpdate.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function deleteFromCart(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const newCart = cart.filter((prod) => {
      return prod.product._id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function checkout() {
    const items = cart.map((item) => ({
      id: item.product._id,
      quantity: item.quantity,
    }));
    saveCart(items).then(() => {
      fetch(`${baseURL}/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: items,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then(({ url }) => {
          window.location = url;
        });
    });
  }

  function goToShop() {
    navigate("/");
  }

  return (
    <div className="cart-page">
      <div className="order-div" ref={divRef}>
        <span>
          subtotal({totalQuantity} items): {totalCost}$
        </span>
        <button onClick={cart.length === 0 ? goToShop : checkout}>
          {cart.length === 0 ? "shop" : "proceed to checkout"}
        </button>
      </div>

      <div className="cart">
        {cart && cart.length === 0 ? (
          <h1>Your cart is empty</h1>
        ) : (
          cart.map((prod) => {
            return (
              <Link to={`/product/${prod.product._id}`} key={prod.product._id}>
                <Product
                  updateCart={updateCart}
                  product={prod.product}
                  quantity={prod.quantity}
                  page={"cart"}
                  deleteFromCart={deleteFromCart}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CartPage;
