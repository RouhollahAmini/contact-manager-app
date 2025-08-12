import { useState, useEffect, useContext } from "react";

import { ContactContext } from "../../context/contactContext";

import { Link, useParams, useNavigate } from "react-router";

import { getContactById, updateContact } from "../../services/contactService";

import { Spinner } from "../";


const EditContact = () => {

    const navigate = useNavigate();
    const { contactId } = useParams();

    const { contacts, setContacts, setFilteredContacts, loading, setLoading, groups } = useContext(ContactContext);

    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContactById(contactId);

                setLoading(false);
                setContact(contactData);

            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onContactChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            const { data, status } = await updateContact(contactId, contact);

            if (status === 200) {
                setLoading(false);

                const allContacts = [...contacts];
                const contactIndex = allContacts.findIndex((contact) => contact.id === parseInt(contactId));

                allContacts[contactIndex] = data;
                setContacts(allContacts);
                setFilteredContacts(allContacts);

                navigate("/contacts");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="container bg-white dark:bg-gray-900 mt-2">
                            <div className="lg:grid lg:max-h-screen lg:grid-cols-12">
                                <aside className="flex items-center justify-center lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 px-4 py-4 sm:px-8 lg:px-12 lg:py-4">
                                    <img
                                        alt="image of man taking note"
                                        src={contact.image}
                                        className="inset-0 w-1/2 h-1/2 rounded-lg"
                                    />
                                </aside>

                                <main
                                    className="flex items-center justify-center px-4 py-4 sm:px-8 lg:col-span-7 lg:px-12 lg:py-4 xl:col-span-6"
                                >
                                    <div className="max-w-xl lg:max-w-3xl">


                                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                            ویرایش اطلاعات
                                        </h1>

                                        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                            شما می توانید اطلاعات مخاطب خود را در فرم زیر ویرایش کنید.
                                        </p>

                                        <form onSubmit={submitForm} className="mt-8 grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="fullname"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    نام و نام خانوادگی :
                                                </label>

                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={contact.fullname}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="mobile"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    شماره موبایل :
                                                </label>

                                                <input
                                                    type="number"
                                                    id="mobile"
                                                    name="mobile"
                                                    value={contact.mobile}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    ایمیل :
                                                </label>

                                                <input
                                                    type="email"
                                                    id="Email"
                                                    name="email"
                                                    value={contact.email}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="job"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    شغل :
                                                </label>

                                                <input
                                                    type="text"
                                                    id="job"
                                                    name="job"
                                                    value={contact.job}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label
                                                    htmlFor="group"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    گروه :
                                                </label>

                                                <select
                                                    id="group"
                                                    name="group"
                                                    value={contact.group}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    آدرس تصویر :
                                                </label>

                                                <input
                                                    type="text"
                                                    id="image"
                                                    name="image"
                                                    value={contact.image}
                                                    onChange={onContactChange}
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
                                            </div>


                                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                                <input type='submit' value="ویرایش مخاطب"
                                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                                />
                                                <Link
                                                    to="/contacts"
                                                    className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white"
                                                >
                                                    برگشت
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </main>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}

export default EditContact;