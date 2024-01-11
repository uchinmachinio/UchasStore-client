import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import AuthForm from "../Components/AuthForm/AuthForm";
import UserMenu from "../Components/UserMenu/UserMenu";
import Header from "../Components/Header/Header";
import { UserContext } from "../Contexts/UserContext/UserContext";
import ProductPage from "../Components/ProductPage/ProductPage";
import AccountPage from "../Components/AccountPage/AccountPage";
import CartPage from "../Components/CartPage/CartPage";
import UploadsPage from "../Components/UploadsPage/UploadsPage";
import AddNewProductPage from "../Components/AddNewProductPage/AddNewProductPage";
import SingleProductPage from "../Components/SingleProductPage/SingleProductPage";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import { fetchUserDataIfAuthenticated } from "../Utils/api";
import OrdersPage from "../Components/OrdersPage/OrdersPage";
import AddressForm from "../Components/AddressForm/AddressForm";
import ProtectedRoute from "../Components/PortectedRoute/ProtectedRoute";
import ProfilePage from "../Components/ProfilePage/ProfilePage";

function App() {
  //user session tracking could maybe make it so that only header reloads
  const { setUserInfo } = useContext(UserContext);

  //check if authenticated
  useEffect(() => {
    fetchUserDataIfAuthenticated()
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch((err) => console.log(err));
  }, []);
  //signin form
  const [authFormIsOpen, setAuthFormIsOpen] = useState(false);

  function openAuthForm() {
    setAuthFormIsOpen(true);
  }

  function closeAuthForm() {
    setAuthFormIsOpen(false);
  }

  //user menu
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [userMenuRect, setUserMenuRect] = useState({});

  function closeMenu() {
    setUserMenuIsOpen(false);
  }

  function toggleUserMenu(rect) {
    setUserMenuRect(rect);
    setUserMenuIsOpen(!userMenuIsOpen);
  }
  //// search

  const [searchText, setSearchText] = useState("");

  function search(e) {
    e.preventDefault();
    setSearchText(e.target.search.value);
  }
  //take care of not rendering nonexistent pages
  return (
    <>
      <Header
        openAuthForm={openAuthForm}
        toggleUserMenu={toggleUserMenu}
        search={search}
      />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProductPage
                searchText={searchText}
                openAuthForm={openAuthForm}
              />
            }
          />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route element={<ProtectedRoute openAuthForm={openAuthForm} />}>
            <Route element={<ProfilePage />}>
              <Route path="uploads" element={<UploadsPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="add-new-product" element={<AddNewProductPage />} />
            </Route>
          </Route>
          <Route
            path="/cart"
            element={<CartPage openAuthForm={openAuthForm} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {/* fix this */}
      <UserMenu
        userMenuIsOpen={userMenuIsOpen}
        rect={userMenuRect}
        closeMenu={closeMenu}
      />

      {authFormIsOpen && <AuthForm closeAuthForm={closeAuthForm} />}
      <AddressForm />

      <Footer />
    </>
  );
}

export default App;
