import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const API = "https://contact-management-backend-z9r8.onrender.com/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setContacts(data);
  };

  const addContact = async (contact) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (res.ok) {
      fetchContacts();
    }
  };

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this contact?'
    );

    if (!confirmDelete) return;

    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setContacts((prev) => prev.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="box form-box">
          <h1>ADD CONTACT'S</h1>
          <ContactForm onAdd={addContact} />
        </div>

        <div className="box list-box">
          <h1>SAVED CONTACTS</h1>
          <ContactList
            contacts={contacts}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
