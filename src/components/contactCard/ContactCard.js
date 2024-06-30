import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, onEdit, onDelete, isEditing, onChange, onSave }) => {
    return (
        <div className="contact-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => onChange({ ...contact, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => onChange({ ...contact, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={contact.phone}
                        onChange={(e) => onChange({ ...contact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        value={contact.address.street}
                        onChange={(e) => onChange({ ...contact, address: { ...contact.address, street: e.target.value } })}
                    />
                    <input
                        type="text"
                        value={contact.company.name}
                        onChange={(e) => onChange({ ...contact, company: { ...contact.company, name: e.target.value } })}
                    />
                    <button className="save-btn" onClick={onSave}>Save</button>
                </>
            ) : (
                <>
                    <h3>{contact.name}</h3>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Address:</strong> {contact.address.street}, {contact.address.city}</p>
                    <p><strong>Company:</strong> {contact.company.name}</p>
                    <button className="edit-btn" onClick={onEdit}>Edit</button>
                    <button className="delete-btn" onClick={onDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default ContactCard;
