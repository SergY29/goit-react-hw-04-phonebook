import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import data from './Data/data.json';

const TEL = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(TEL)) ?? data
  );
  const [filter, setFilter] = useState('');

  const filteredNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (contacts !== data) {
      localStorage.setItem(TEL, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const notUniqueName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (notUniqueName) {
      return alert(`${name} is alredy in contacts!`);
    }
    setContacts([newContact, ...contacts]);
  };

  const handleFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmitCont={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={handleFilter} />
      <ContactList contacts={filteredNames} onDelete={handleDelete} />
    </Container>
  );
};
