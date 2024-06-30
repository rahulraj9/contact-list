// src/components/ContactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactCard from '../contactCard/ContactCard';
import ContactForm from '../contactForm/ContactForm';
import Popup from '../popup/Popup';
import './ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: { street: '', city: '' }, company: { name: '' } });
    const [editingContact, setEditingContact] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
            // Simulate adding a new contact locally with a new id
            const newContactWithId = { ...response.data, id: contacts.length + 1 };
            setContacts([newContactWithId, ...contacts]);
            setNewContact({ name: '', email: '', phone: '', address: { street: '', city: '' }, company: { name: '' } });
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const updateContact = async (id) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, editingContact);
            // Update contact locally
            setContacts(contacts.map(contact => contact.id === id ? editingContact : contact));
            setEditingContact(null);
        } catch (error) {
            console.error('Error updating contact:', error);
            // Fallback: Update contact locally even if API call fails
            setContacts(contacts.map(contact => contact.id === id ? editingContact : contact));
            setEditingContact(null);
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            // Remove contact locally
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
            // Fallback: Remove contact locally even if API call fails
            setContacts(contacts.filter(contact => contact.id !== id));
        }
    };

    return (
        <div className="contact-list">
            <h1>Contact List</h1>
            <button className="add-btn" onClick={() => setIsPopupOpen(true)}>Add New Contact</button>
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <ContactForm
                    contact={newContact}
                    onChange={setNewContact}
                    onSubmit={addContact}
                />
            </Popup>
            <div className="cards-container">
                {contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={editingContact && editingContact.id === contact.id ? editingContact : contact}
                        isEditing={editingContact && editingContact.id === contact.id}
                        onEdit={() => setEditingContact(contact)}
                        onDelete={() => deleteContact(contact.id)}
                        onChange={(updatedContact) => setEditingContact(updatedContact)}
                        onSave={() => updateContact(contact.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactList;
