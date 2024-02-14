import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCloseModal,
  onCreateModal,
  onAddItem,
  onDeleteItem,
  onSelectCard,
  handleEditProfileModal,
  handleLogout,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile__container">
      <SideBar
        handleEditProfileModal={handleEditProfileModal}
        handleLogout={handleLogout}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCloseModal={handleCloseModal}
        onCreateModal={onCreateModal}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
