import { Link } from "react-router-dom";
import "./UserMenu.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { saveCart, logOut } from "../../Utils/api";

function UserMenu(props) {
  const menuRef = useRef(null);

  const { setUserInfo } = useContext(UserContext);

  const position = {
    top: (props.rect?.top || 0) + 30,
    left: (props.rect?.left || 0) - 105,
  };

  function handleClickOutside(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      props.closeMenu();
    }
  }

  useEffect(() => {
    if (props.userMenuIsOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.userMenuIsOpen]);

  function signOut() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const itemIds = cart.map((item) => ({
      id: item.product._id,
      quantity: item.quantity,
    }));

    saveCart(itemIds)
      .then(() => {
        logOut();
      })
      .then(() => {
        setUserInfo({});
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      id="user-menu"
      className={props.userMenuIsOpen ? "" : "closed"}
      style={position}
      ref={menuRef}
    >
      <ul>
        <Link to="/account">Account</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/uploads">My Uploads</Link>
        <Link to={"/"} onClick={signOut}>
          Log Out
        </Link>
      </ul>
    </div>
  );
}

export default UserMenu;
