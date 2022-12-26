import React from "react";

const Modal = ({title='Test', message='Test', setShow, show=false, btn}) => {
    const closeModal = (e) => {
        e.preventDefault();
        setShow(false);
    }
    if(!show)
        return null;
    return (
        <div className="modal">
            <div className="modal-body">
                <div className="modal-header">
                    <span className="close" onClick={closeModal}><i></i></span>
                    {title}
                </div>
                <div className="modal-content">
                    {message}
                </div>
                {btn && (
                    <div className="modal-footer">
                        <button className="btn" onClick={closeModal}>Cancel</button>
                        <button className={`btn ${btn.type}`} onClick={btn.action}>{btn.text}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;