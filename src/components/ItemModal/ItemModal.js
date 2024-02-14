import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({
  selectedCard,
  onSelectCard,
  onClose,
  openConfirmationModal,
}) => {
  return (
    <div className={`modal`}>
      <div className="modal__item-content">
        <button
          className="modal__item-button_type_close"
          type="button"
          onClick={onClose}
        />
        <img
          src={selectedCard.imageUrl}
          onClick={onSelectCard}
          alt={selectedCard.name}
        />
        <div className="modal__item-info">
          <div>
            <h2 className="modal__item-info_type_name">{selectedCard.name}</h2>
            <p className="modal__item-info_type_weather">
              Weather type: {selectedCard.weather}
            </p>
          </div>
          <button
            className="modal__button_type_delete"
            type="button"
            onClick={openConfirmationModal}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
