import React from "react";
import modalStyle from "./modal.module.css";

export default function Modal({ state, fState }) {
  const closeModal = () => {
    fState(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={modalStyle.overlay} onClick={closeModal}>
      <div className={modalStyle.modal} onClick={handleModalClick}>
        <button className={modalStyle.close} onClick={closeModal}>
          ×
        </button>
        <div className={modalStyle.container_inputs}>
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
        </div>
      </div>
    </div>
  );
}
