import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  button,
  title,
  onClose,
  name,
  onSubmit,
}) => {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <h1 className="modal__title">{title}</h1>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">{button}</div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
