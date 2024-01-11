import { useContext } from "react";
import SearchBar from "../SearchBar/SearchBar";
import UserButton from "../UserButton/UserButton";
import "./Header.css";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import CartButton from "../CartButton/CartButton";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  return (
    <header>
      <nav className="navbar">
        <h1
          className="logo"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          logo
        </h1>
        <SearchBar search={props.search} />
        <div className="right-nav">
          <CartButton openAuthForm={props.openAuthForm} />
          <UserButton
            openAuthForm={props.openAuthForm}
            toggleUserMenu={props.toggleUserMenu}
          />
          <span className="username">{userInfo.username ?? "Guest"}</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
