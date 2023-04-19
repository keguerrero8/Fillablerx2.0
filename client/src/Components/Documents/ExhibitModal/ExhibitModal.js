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
                <div className='tier'>
                    <h3>Network</h3>
                    <p>{props.tier1}</p>
                    <p>{props.tier2}</p>
                    <p>{props.tier3}</p>
                    <p>{props.tier4}</p>
                </div>
                <div className='fee'>
                    <h3>Amount</h3>
                    <p>${props.amount1}</p>
                    <p>${props.amount2}</p>
                    <p>${props.amount3}</p>
                    <p>${props.amount4}</p>
                </div>
                <div className='freq'>
                    <h3>Frequency</h3>
                    <p>{props.frequency1}</p>
                    <p>{props.frequency2}</p>
                    <p>{props.frequency3}</p>
                    <p>{props.frequency4}</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
