import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Container } from './App.styled';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import data from './Data/data.json';

const TEL = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // console.log('componentDidMount');
    const contacts = JSON.parse(localStorage.getItem(TEL)) || data;
    this.setState({ contacts });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (
      prevState.contacts.length !== 0 &&
      prevState.contacts.length !== contacts.length
    ) {
      localStorage.setItem(TEL, JSON.stringify(this.state.contacts));
      // console.log('componentDidUpdate');
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
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

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
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
