import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div>
      <div className={`modal`}>
        <div className="modal__item-content">
          <button
            className="modal__item-button_type_close"
            type="button"
            onClick={onClose}
          ></button>
          <img src={selectedCard.link} />
          <div className="modal__item-info">
            <div className="modal__item-info_type_name">
              {selectedCard.name}
            </div>
            <div>Weather type: {selectedCard.weather}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
