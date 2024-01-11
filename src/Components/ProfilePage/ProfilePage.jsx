import { Outlet } from "react-router-dom";
import ProfileSquare from "../ProfileSquare/ProfileSquare";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div id="profile">
      <ProfileSquare />
      <Outlet />
    </div>
  );
}

export default ProfilePage;
