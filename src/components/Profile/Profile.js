import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCloseModal,
  onCreateModal,
  onAddItem,
  onDeleteItem,
  onSelectCard,
}) {
  return (
    <div className="profile__container">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCloseModal={handleCloseModal}
        onCreateModal={onCreateModal}
        onAddItem={onAddItem}
        onDeleteItem={onDeleteItem}
        onSelectCard={onSelectCard}
      />
    </div>
  );
}

export default Profile;
