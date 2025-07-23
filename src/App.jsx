import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components';

import { getAllContacts, getAllGroups, createContact } from './services/contactService';

import './App.css'

const App = () => {
    const [loading, setLoading] = useState(false);
    const [forceRender, setForceRender] = useState(false);
    const [getContacts, setContacts] = useState([]);
    const [getGroups, setGroups] = useState([]);
    const [getContact, setContact] = useState({
        fullname: "",
        mobile: "",
        email: "",
        job: "",
        group: "",
        image: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();
                const { data: groupsData } = await getAllGroups();

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();
                

                setContacts(contactsData);
                

                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchData();
    }, [forceRender])

    //create a handler for contact submit form
    const createContactForm = async event => {
        event.preventDefault();
        try {
            const { status } = await createContact(getContact);
            if (status === 201) {
                setContact({});
                setForceRender(!forceRender);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    //create a event handler for contact
    const setContactInfo = (event) => {
        setContact({
            ...getContact,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to={'/contacts'} />} />
                <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
                <Route path='/contacts/add' element={
                    <AddContact
                        loading={loading}
                        setContactInfo={setContactInfo}
                        contact={getContact}
                        groups={getGroups}
                        createContactForm={createContactForm}
                    />
                } />
                <Route path='/contacts/:contactId' element={<ViewContact />} />
                <Route path='/contacts/edit/:contactId' element={<EditContact />} />
            </Routes>
        </>
    )
}

export default App;