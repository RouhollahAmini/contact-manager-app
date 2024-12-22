import { useState } from 'react';
import { Contacts, Navbar } from './components';

import './App.css'

const App = () => {
    const [loading, setLoading] = useState(false);
    const [getContacts, setContacts] = useState([]);

    return (
        <>
            <Navbar />
            <Contacts contacts={getContacts} loading={loading} />
        </>
    )
}

export default App;