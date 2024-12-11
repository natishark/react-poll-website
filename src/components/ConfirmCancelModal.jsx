import { useState, useEffect, useRef } from "react";

function ConfirmCancelModal({isOpen, message, focusOnConfirm, onConfirm, onCancel}) {
  const modalRef = useRef(null);
  const focusedButtonRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  function setFocus() {
    focusedButtonRef.current.focus();
  }

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
        setFocus();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  function handleConfirm() {
    onConfirm();
    handleCloseModal();
  }

  function handleCancel() {
    onCancel();
    handleCloseModal();
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      handleCancel();
    }
  }

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal-dialog" onMouseDown={event => (event.target === event.currentTarget) && handleCancel()}>
      <h2 className="main-section-title">{message}</h2>
      <div className="btn-group">
        <button 
          ref={focusOnConfirm ? null : focusedButtonRef} 
          onClick={handleCancel}
          className="ui-button dangerous">
          Cancel
        </button>
        <button
          ref={focusOnConfirm ? focusedButtonRef : null}
          onClick={handleConfirm}
          className="ui-button encourage">
          OK!
        </button>
      </div>
    </dialog>
  );
}

export default ConfirmCancelModal;