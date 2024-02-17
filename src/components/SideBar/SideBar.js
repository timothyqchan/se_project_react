import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfileModal, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="sideBar">
      <div className="sideBar__container">
        <img
          className="sideBar__avatar_image"
          src={currentUser?.avatar}
          alt="profile avatar"
        />
        <p className="sideBar__username">{currentUser?.name}</p>
      </div>
      <button className="sideBar__edit" onClick={handleEditProfileModal}>
        Edit profile data
      </button>
      <button onClick={handleLogout} className="sideBar-logout">
        Logout
      </button>
    </section>
  );
}

export default SideBar;
