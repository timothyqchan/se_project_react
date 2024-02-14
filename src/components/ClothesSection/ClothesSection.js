import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

const ClothesSection = ({
  clothingItems,
  onCreateModal,
  onSelectCard,
  isLoggedIn,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const filteredCards = clothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <section className="clothesSection">
      <div className="card_section-title">
        <p>Your Items</p>
        <button
          type="button"
          className="card-section__avatar_button"
          onClick={onCreateModal}
        >
          + Add clothes
        </button>
      </div>
      <div className="card_items">
        {filteredCards.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onSelectCard={onSelectCard}
              isLoggedIn={isLoggedIn}
              onCardLike={onCardLike}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ClothesSection;
