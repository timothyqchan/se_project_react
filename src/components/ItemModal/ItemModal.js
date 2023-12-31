import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__item-content">
        <button
          className="modal__item-button_type_close"
          type="button"
          onClick={onClose}
        />
        <img src={selectedCard.link} alt={selectedCard.name} />
        <div className="modal__item-info">
          <p className="modal__item-info_type_name">{selectedCard.name}</p>
          <p>Weather type: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
