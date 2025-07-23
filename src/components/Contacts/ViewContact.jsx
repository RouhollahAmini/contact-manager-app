import { useState, useEffect } from "react";

import { Link, useParams } from "react-router";

import { getContactById, getGroupById } from "../../services/contactService";

import { Spinner } from "../";


const ViewContact = () => {
    const { contactId } = useParams();
    const [state, setState] = useState({
        loading: false,
        contact: {},
        group: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContactById(contactId);
                const { data: groupData } = await getGroupById(contactData.group);

                setState({ ...state, loading: false, contact: contactData, group: groupData });
            } catch (error) {
                console.log(error.message);
                setState({ ...state, loading: false });
            }
        };
        fetchData();
    }, []);

    const { loading, contact, group } = state;

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
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                >

                                                    <option key={group.id} value={group.id}>
                                                        {group.name}
                                                    </option>

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
                                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                                />
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