import React from 'react';
import './Popup.css';

const Popup = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
