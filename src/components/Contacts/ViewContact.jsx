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

    // تولید آواتار متنی بر اساس نام
    const generateAvatar = (name) => {
        if (!name) return '?';
        const initials = name.split(' ').map(n => n[0]).join('');
        return initials.substring(0, 2);
    };

    // رنگ‌های مختلف برای آواتار
    const avatarColors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-pink-500',
        'bg-indigo-500'
    ];

    // انتخاب رنگ بر اساس نام
    const getAvatarColor = (name) => {
        if (!name) return avatarColors[0];
        const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return avatarColors[charCodeSum % avatarColors.length];
    };

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
                        <section className="py-8">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 p-8 flex flex-col items-center justify-center">
                                            {contact.image ? (
                                                <img
                                                    alt="تصویر مخاطب"
                                                    src={contact.image}
                                                    className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                                                />
                                            ) : (
                                                <div className={`${getAvatarColor(contact.fullname)} w-48 h-48 rounded-full flex items-center justify-center text-white font-bold text-4xl`}>
                                                    {generateAvatar(contact.fullname)}
                                                </div>
                                            )}
                                            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{contact.fullname}</h2>
                                            <p className="mt-1 text-gray-600 dark:text-gray-300">{contact.job || "بدون شغل"}</p>
                                            
                                            <div className="mt-6 flex space-x-4 rtl:space-x-reverse">
                                                <a href={`tel:${contact.mobile}`} className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                    </svg>
                                                </a>
                                                <a href={`mailto:${contact.email}`} className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <div className="md:w-2/3 p-8">
                                            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">اطلاعات تماس</h3>
                                            </div>
                                            
                                            <dl className="mt-6 space-y-6">
                                                <div className="flex items-center">
                                                    <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">نام کامل:</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{contact.fullname}</dd>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">شماره موبایل:</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{contact.mobile}</dd>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">آدرس ایمیل:</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{contact.email}</dd>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">شغل:</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{contact.job || "ثبت نشده"}</dd>
                                                </div>
                                                
                                                <div className="flex items-center">
                                                    <dt className="w-32 text-sm font-medium text-gray-500 dark:text-gray-400">گروه:</dt>
                                                    <dd className="text-sm text-gray-900 dark:text-white">{group.name || "ثبت نشده"}</dd>
                                                </div>
                                            </dl>
                                            
                                            <div className="mt-8 flex space-x-4 rtl:space-x-reverse">
                                                <Link
                                                    to={`/contacts/edit/${contact.id}`}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                                                >
                                                    ویرایش مخاطب
                                                </Link>
                                                <Link
                                                    to="/contacts"
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
                                                >
                                                    بازگشت
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}

export default ViewContact;