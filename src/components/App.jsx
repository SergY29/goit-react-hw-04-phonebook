import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Container } from './App.styled';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newPhoneNumber => {
    const { name, number } = newPhoneNumber;
    const { contacts } = this.state;
    console.log(newPhoneNumber);

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const notUniqueName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (notUniqueName) {
      console.log('такое имя уже есть');
      alert(`${name} is alredy in contacts!`);
      return;
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleFilter = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDelete = id => {
    this.setState(prevState => {
      const newList = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: newList };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    const filteredNames = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmitCont={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilter={this.handleFilter} />
        <ContactList contacts={filteredNames} onDelete={this.handleDelete} />
      </Container>
    );
  }
}
