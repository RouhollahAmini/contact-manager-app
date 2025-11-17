import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';

import { AddContact, Contacts, EditContact, Navbar, ViewContact } from './components';

import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService';

import { confirmAlert } from 'react-confirm-alert';

import { ContactContext } from './context/contactContext';

import _ from 'lodash';

import { useImmer } from 'use-immer';

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


    const confirmDelete = (contactId, contactFullname) => {
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

                                <p className="mt-0.5 text-sm text-gray-700">آیا از پاک کردن {contactFullname} مطمئن هستید؟</p>

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
        const allContacts = [...contacts];
        try {
            setLoading(true);
            const updatedContacts = allContacts.filter((contact) => contact.id !== contactId);

            setContacts(updatedContacts);
            setFilteredContacts(updatedContacts);

            const { status } = await deleteContact(contactId);
            if (status !== 200) {
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);

            setContacts(allContacts);
            setFilteredContacts(allContacts);
            setLoading(false);
        }
    }

    // debounce search
    // let filterTimeout;
    const contactSearch = _.debounce(query => {
        // clearTimeout(filterTimeout);

        // filterTimeout = setTimeout(() => {
        setFilteredContacts(contacts.filter((contact) => {
            return contact.fullname.toLowerCase()
                .includes(query.toLowerCase());
        }));
        // }, 1000);
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
            deleteContact: confirmDelete,
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