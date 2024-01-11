import { useContext, useState } from "react";
import "./AuthForm.css";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import { baseURL, getCart, logIn, register } from "../../Utils/api";

function AuthForm(props) {
  // user context management
  const { setUserInfo } = useContext(UserContext);

  //login/register switch
  const [toRegister, setToRegister] = useState(false);

  function toggleRegisterMode() {
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
    setIncorrectPassword(false);
    setIncorrectUsername(false);
    setErrMessage(null);
    setToRegister((toRegister) => !toRegister);
  }

  //input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  //validation
  const [errMessage, setErrMessage] = useState(null);
  const [incorrectUsername, setIncorrectUsername] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectConfirmPassword, setIncorrectConfrimPassword] =
    useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);

  async function handleGoogleAuth(e) {
    e.preventDefault();
    window.location.href = `${baseURL}/auth/google`; // Redirect the user to Google for authentication
  }

  //login
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { response, data } = await logIn(username, password);

      if (response.ok) {
        props.closeAuthForm();
        setUserInfo(data);
        getCart()
          .then((cartData) => {
            localStorage.setItem("cart", JSON.stringify(cartData));
          })
          .catch((err) => console.log(err));
      } else {
        setErrMessage(data);
        if (data === "Incorrect username") {
          setIncorrectUsername(true);
        } else {
          setIncorrectPassword(true);
          setIncorrectUsername(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  //register
  async function handleRegister(e) {
    e.preventDefault();
    setIncorrectEmail(false);
    setIncorrectUsername(false);
    setIncorrectPassword(false);
    setIncorrectConfrimPassword(false);

    if (password !== confirmPassword) {
      setErrMessage("passwords do not match");
      setIncorrectPassword(true);
      setIncorrectConfrimPassword(true);
      return;
    }

    try {
      const { response, data } = await register(username, password, email);

      if (response.ok) {
        props.closeAuthForm();
        setToRegister(false);
        setUserInfo(data);
      } else {
        console.log(data);
        setErrMessage(data.error);
        if (data.error === "Email is already registered.") {
          setIncorrectEmail(true);
        } else if (data.error === "Username already in use") {
          setIncorrectUsername(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="auth-form">
      <button
        className="close-btn"
        onClick={() => {
          props.closeAuthForm();
          setToRegister(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </button>
      <h1>{toRegister ? "Registration" : "Authorization"}</h1>

      <form onSubmit={toRegister ? handleRegister : handleLogin}>
        <span className="error-message">{errMessage}</span>
        <input
          id="username-input"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          required
          style={{ borderColor: incorrectUsername && "red" }}
        />
        {toRegister ? (
          <input
            type="email"
            id="email-input"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            style={{ borderColor: incorrectEmail && "red" }}
          />
        ) : null}
        <br />
        <input
          id="password-input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          style={{ borderColor: incorrectPassword && "red" }}
        />
        <br />
        {toRegister ? (
          <input
            type="password"
            id="repeat-password-input"
            placeholder="repeat password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
            required
            style={{ borderColor: incorrectConfirmPassword && "red" }}
          />
        ) : null}
        <button className="auth-btn">
          {toRegister ? "Register" : "Sign In"}
        </button>
      </form>
      <button className="google-auth-btn" onClick={handleGoogleAuth}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 326667 333333"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
            fill="#4285f4"
          />
          <path
            d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
            fill="#34a853"
          />
          <path
            d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
            fill="#fbbc04"
          />
          <path
            d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
            fill="#ea4335"
          />
        </svg>
      </button>
      <br />
      <button className="signin-or-register" onClick={toggleRegisterMode}>
        {toRegister ? "Sign In" : "Register"}
      </button>
    </div>
  );
}

export default AuthForm;
