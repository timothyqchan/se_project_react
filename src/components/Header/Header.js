import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Header = ({
  locationName,
  handleCreateModal,
  handleLoginModal,
  handleRegisterModal,
  isLoggedIn,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          {currentDate}, {locationName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="add-clothes_button"
              type="text"
              onClick={handleCreateModal}
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__username">
              <p className="header__name">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar}
                className="header__avatar"
                alt="avatar"
              />
            </Link>
          </>
        ) : (
          <>
            <button className="header__buttons" onClick={handleRegisterModal}>
              Sign Up
            </button>
            <button className="header__buttons" onClick={handleLoginModal}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
