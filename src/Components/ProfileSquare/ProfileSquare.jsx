import profileImage from "../../assets/defaultuserimage.png";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext/UserContext";
import "./ProfileSquare.css";

function ProfileSquare() {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="profile-wrapper">
      <div className="profile-div">
        <div className="profile-inner">
          <img
            src={profileImage}
            alt="profile picture"
            className="profile-image"
          />
          <span>{userInfo.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSquare;
