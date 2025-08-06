import { useState, useEffect, useContext } from "react";

import { ContactContext } from "../../context/contactContext";

import { Link, useParams } from "react-router";

import { getContactById, getGroupById } from "../../services/contactService";

import { Spinner } from "../";


const ViewContact = () => {
    const { contactId } = useParams();

    const [state, setState] = useState({
        contact: {},
        group: {}
    });

    const { loading, setLoading } = useContext(ContactContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { data: contactData } = await getContactById(contactId);
                const { data: groupData } = await getGroupById(contactData.group);

                setLoading(false);
                setState({ ...state, contact: contactData, group: groupData });
            } catch (error) {
                console.log(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const { contact, group } = state;

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
                                            مشاهده اطلاعات
                                        </h1>

                                        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                            شما می توانید اطلاعات مخاطب خود را در فرم زیر مشاهده کنید.
                                        </p>

                                        <div className="mt-8 grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <span
                                                    htmlFor="fullname"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    نام و نام خانوادگی :
                                                </span>

                                                <div
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"

                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {contact.fullname}
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <span
                                                    htmlFor="mobile"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    شماره موبایل :
                                                </span>

                                                <div
                                                    type="number"
                                                    id="mobile"
                                                    name="mobile"
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {contact.mobile}
                                                </div>
                                            </div>

                                            <div className="col-span-6">
                                                <span htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    ایمیل :
                                                </span>

                                                <div
                                                    type="email"
                                                    id="Email"
                                                    name="email"
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {contact.email}
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <span
                                                    htmlFor="job"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    شغل :
                                                </span>

                                                <div
                                                    type="text"
                                                    id="job"
                                                    name="job"
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {contact.job}
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <span
                                                    htmlFor="job"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    گروه :
                                                </span>

                                                <div
                                                    type="text"
                                                    id="job"
                                                    name="job"
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >
                                                    {group.name}
                                                </div>
                                            </div>

                                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                                <Link
                                                    to="/contacts"
                                                    className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500 dark:hover:bg-red-700 dark:hover:text-white"
                                                >
                                                    برگشت
                                                </Link>
                                            </div>
                                        </div>
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

export default ViewContact;