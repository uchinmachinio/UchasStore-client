import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserDataIfAuthenticated } from "../../Utils/api";

function ProtectedRoute({ openAuthForm }) {
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDataIfAuthenticated()
      .then((userData) => {
        if (Object.keys(userData).length === 0) {
          openAuthForm();
          setAuthorized(false);
          navigate("/");
        } else {
          setAuthorized(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return authorized ? <Outlet /> : <></>;
}

export default ProtectedRoute;
