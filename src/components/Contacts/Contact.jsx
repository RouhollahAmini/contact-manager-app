import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const Contact = ({ contact, deleteContact }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const handleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        function handleClickOutside(event) {
            // اگر کلیک بیرون از container بود، دراپ‌داون رو ببند
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

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

    // تولید آواتار متنی بر اساس نام
    const generateAvatar = (name) => {
        if (!name) return '?';
        const initials = name.split(' ').map(n => n[0]).join('');
        return initials.substring(0, 2);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="p-5">
                <div className="flex justify-between sm:items-start gap-4">
                    <div className="flex flex-row items-center gap-4">
                        {/* آواتار مخاطب */}
                        {contact.image ? (
                            <img
                                alt={contact.fullName}
                                src={contact.image}
                                className="size-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                            />
                        ) : (
                            <div className={`${getAvatarColor(contact.fullname)} size-16 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                                {generateAvatar(contact.fullname)}
                            </div>
                        )}
                        <div className="">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {contact.fullname}
                            </h3>
                            <span className="inline-flex items-center max-h-fit px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                {contact.job || "بدون شغل"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="relative" ref={containerRef}>
                            <button
                                onClick={handleOpen}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div
                                    className="absolute left-0 z-10 mt-2 w-48 origin-top-left divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800"
                                    role="menu"
                                >
                                    <div className="p-1">
                                        <Link
                                            to={`/contacts/${contact.id}`}
                                            className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                            role="menuitem"
                                        >
                                            مشاهده مخاطب
                                        </Link>

                                        <Link
                                            to={`/contacts/edit/${contact.id}`}
                                            className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                            role="menuitem"
                                        >
                                            ویرایش مخاطب
                                        </Link>
                                    </div>

                                    <div className="p-1">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                            role="menuitem"
                                            onClick={deleteContact}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>

                                            حذف مخاطب
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center rounded-lg border border-gray-200 p-3 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500 transition-colors">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">شماره تماس</span>
                            <a href={`tel:${contact.mobile}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {contact.mobile}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center rounded-lg border border-gray-200 p-3 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500 transition-colors">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">ایمیل</span>
                            <a href={`mailto:${contact.email}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {contact.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;