import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components';

import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService';

import { confirmAlert } from 'react-confirm-alert';

import './App.css'

const App = () => {
    const [loading, setLoading] = useState(false);
    const [forceRender, setForceRender] = useState(false);
    const [getContacts, setContacts] = useState([]);
    const [getFilteredContacts, setFilteredContacts] = useState([]);
    const [getGroups, setGroups] = useState([]);
    const [getContact, setContact] = useState({
        fullname: "",
        mobile: "",
        email: "",
        job: "",
        group: "",
        image: ""
    });
    const [query, setQuery] = useState({ text: "" });


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactsData } = await getAllContacts();

                setContacts(contactsData);
                
                setFilteredContacts(contactsData);

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

    const confirm = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div role="alert" className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-4">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 text-red-600"
                            >
                                <path
                                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                />
                            </svg>

                            <div className="flex-1">
                                <strong className="font-medium text-gray-900"> پاک کردن مخاطب </strong>

                                <p className="mt-0.5 text-sm text-gray-700">آیا از پاک کردن مخاطب مطمئن هستید؟</p>

                                <div className="mt-3 flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
                                        onClick={() => {
                                            removeContact(contactId);
                                            onClose();
                                        }}
                                    >
                                        مطمئن هستم
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded border border-transparent px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                                        onClick={onClose}
                                    >
                                        انصراف
                                    </button>
                                </div>
                            </div>

                            <button
                                className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                                type="button"
                                aria-label="Dismiss alert"
                                onClick={onClose}
                            >
                                <span className="sr-only">Dismiss popup</span>

                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
        })
    }

    const removeContact = async (contactId) => {
        try {
            setLoading(true);
            const response = await deleteContact(contactId);
            if (response) {
                const { data: contactsData } = await getAllContacts();
                setContacts(contactsData);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    const contactSearch = (event) => {
        setQuery({ ...query, text: event.target.value });
        const allContacts = getContacts.filter((contact) => {
            return contact.fullname.toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredContacts(allContacts);
    }

    return (
        <>
            <Navbar query={query} search={contactSearch} />
            <Routes>
                <Route path='/' element={<Navigate to={'/contacts'} />} />
                <Route path='/contacts' element={<Contacts contacts={getFilteredContacts} loading={loading} confirmDelete={confirm} />} />
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
                <Route path='/contacts/edit/:contactId' element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
            </Routes>
        </>
    )
}

export default App;