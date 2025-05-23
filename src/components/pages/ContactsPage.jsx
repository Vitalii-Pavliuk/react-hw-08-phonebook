import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetContactsQuery, useDeleteContactMutation} from '../../redux/contactsApi';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchContact from '../SearchContact/SearchContact';
import { setFilter } from '../../redux/filtersSlice';
// import style from './ContactsPage.module.css';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.filter);
  const { data: contacts = [], isLoading, isError } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <ContactForm />
      <SearchContact
        value={filter}
        onFilterChange={(e) => dispatch(setFilter(e.target.value))}
      />
      {isLoading && <p>Loading contacts...</p>}
      {isError && <p>Error loading contacts!</p>}
      <ContactList       contacts={filteredContacts} 
      onDelete={(id) => deleteContact(id)}/>
    </div>
  );
};