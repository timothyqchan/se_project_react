import "./DeleteConfirmationModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const DeleteConfirmModal = ({ handleCloseModal, handleDeleteCard }) => {
  const buttonConfirmText = "Yes, delete item";
  const buttonCancelText = "Cancel";
  return (
    <ModalWithForm
      onSubmit={handleDeleteCard}
      onClose={handleCloseModal}
      className="modal__form-confirm"
    >
      <p className="modal__delete-confirmation_text">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__delete-confirmation_warning">
        This action is irreversible.
      </p>
      <button
        className="modal__button-delete"
        type="button"
        onClick={handleDeleteCard}
      >
        {buttonConfirmText}
      </button>
      <button
        className="modal__button-cancel"
        type="button"
        onClick={handleCloseModal}
      >
        {buttonCancelText}
      </button>
    </ModalWithForm>
  );
};
export default DeleteConfirmModal;
