import avatar from "../../images/avatar.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <section className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar_image" src={avatar} alt="avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </section>
  );
}

export default Sidebar;
