import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { AddContact, Contacts, Contact, EditContact, Navbar, ViewContact } from './components';

import { getAllContacts, getAllGroups } from './services/contactService';

import './App.css'

const App = () => {
    const [loading, setLoading] = useState(false);
    const [getContacts, setContacts] = useState([]);
    const [getGroups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data : contactsData } = await getAllContacts();
                const { data : groupsData } = await getAllGroups();
                
                setContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to={'/contacts'} />} />
                <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
                <Route path='/contacts/add' element={<AddContact />} />
                <Route path='/contacts/:contactId' element={<Contact />} />
                <Route path='/contacts/edit/:contactId' element={<EditContact />} />
            </Routes>
        </>
    )
}

export default App;