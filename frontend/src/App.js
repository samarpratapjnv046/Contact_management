import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/api/contacts');
    const data = await response.json();
    setContacts(data);
  };

  const addContact = async (contact) => {
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (response.ok) {
      fetchContacts();
    }
  };

  const deleteContact = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this contact?'
  );

  if (!confirmDelete) return;

  const response = await fetch(
    `http://localhost:5000/api/contacts/${id}`,
    { method: 'DELETE' }
  );

  if (response.ok) {
    setContacts((prev) => prev.filter((c) => c._id !== id));
  }
};


  return (
    <div className="page">
      <div className="container">

        {/* LEFT BOX */}
        <div className="box form-box">
          <h1>ADD CONTACT'S</h1>
          <ContactForm onAdd={addContact} />
        </div>

        {/* RIGHT BOX */}
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
