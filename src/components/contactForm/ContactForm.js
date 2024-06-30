
import React from 'react';
import './ContactForm.css';

const ContactForm = ({ contact, onChange, onSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            onChange({ ...contact, address: { ...contact.address, [addressField]: value } });
        } else if (name.includes('company.')) {
            const companyField = name.split('.')[1];
            onChange({ ...contact, company: { ...contact.company, [companyField]: value } });
        } else {
            onChange({ ...contact, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="address.street" value={contact.address.street} onChange={handleChange} placeholder="Street" required />
            <input type="text" name="address.city" value={contact.address.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="company.name" value={contact.company.name} onChange={handleChange} placeholder="Company" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default ContactForm;
