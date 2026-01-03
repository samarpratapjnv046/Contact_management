import React from 'react';

function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return <p style={{ textAlign: 'center' }}>No contacts found</p>;
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact._id}>
          <h3>{contact.name}</h3>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>Message: {contact.message}</p>

          <button onClick={() => onDelete(contact._id)}>
            Delete Contact
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
