import "./Header.css";

const Header = ({ locationName, onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src="../images/logo.svg" alt="logo" />
        </div>
        <div>
          {currentDate}, {locationName}
        </div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text" onClick={onCreateModal}>
            + Add clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src="/images/avatar.svg" alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
