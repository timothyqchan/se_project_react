import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";

const Header = ({ locationName, onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          {currentDate}, {locationName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="add-clothes_button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
