import React, { useState } from 'react';

import './ExhibitModal.css'

function Modal(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button id='button-style' onClick={handleClick}>{props.modalName}</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>
            <div className='fee-freq'>
                <div className='fee'>
                    <h3>Amount</h3>
                    <p>${props.amount}</p>
                </div>
                <div className='freq'>
                    <h3>Frequency</h3>
                    <p>{props.frequency}</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
