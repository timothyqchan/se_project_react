import avatar from "../../images/avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="sideBar">
      <div className="sideBar__container">
        <img className="sideBar__avatar_image" src={avatar} alt="avatar" />
        <p className="sideBar__username">Terrence Tegegne</p>
      </div>
    </section>
  );
}

export default SideBar;
