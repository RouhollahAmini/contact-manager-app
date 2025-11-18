import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components';

import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService';

import { ContactContext } from './context/contactContext';

import _ from 'lodash';

import { useImmer } from 'use-immer';

import { showDeleteConfirm } from './helpers/contactHelpers';

import './App.css'

const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

                setContacts(contactsData);
                setGroups(groupsData);

                setFilteredContacts(contactsData);

                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    //create a handler for contact submit form
    const createContactForm = async (values) => {
        try {
            setLoading((draft) => !draft);

            const { status, data } = await createContact(values);

            if (status === 201) {

                setContacts((draft) => { draft.push(data); });
                setFilteredContacts((draft) => { draft.push(data); })

                setLoading((prevLoading) => !prevLoading)

                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading);
        }
    }



    const removeContact = async (contactId) => {
        const contactsBackup = [...contacts];
        try {

            setContacts(draft => draft.filter((contact) => contact.id !== contactId));
            setFilteredContacts(draft => draft.filter((contact) => contact.id !== contactId));

            const { status } = await deleteContact(contactId);
            if (status !== 200) {
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
            }
        } catch (error) {
            console.log(error.message);

            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
        }
    }

    const contactSearch = _.debounce(query => {
        if (!query) {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(draft => draft.filter((c) => 
                c.fullname.toLowerCase().includes(query.toLowerCase())
            ));
        }
    }, 1000);

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            contacts,
            setContacts,
            filteredContacts,
            setFilteredContacts,
            groups,
            deleteContact: (contactId, contactFullname) => showDeleteConfirm(contactId, contactFullname, removeContact),
            createContact: createContactForm,
            contactSearch,
        }}>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Navigate to={'/contacts'} />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/contacts/add' element={
                        <AddContact />
                    } />
                    <Route path='/contacts/:contactId' element={<ViewContact />} />
                    <Route path='/contacts/edit/:contactId' element={<EditContact />} />
                </Routes>
            </div>
        </ContactContext.Provider>
    )
}

export default App;