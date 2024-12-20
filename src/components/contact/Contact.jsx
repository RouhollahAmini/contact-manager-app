import { useState } from "react";
const Contact = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="w-1/3">
                        <div className="bg-fourthColor p-4 rounded-xl">
                            <article className="rounded-xl border border-gray-700/20 bg-white p-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        alt=""
                                        src="https://i.pravatar.cc/150?img=4"
                                        className="size-16 rounded-full object-cover"
                                    />

                                    <div className="flex justify-between w-full">
                                        <div className="">
                                            <h3 className="text-md font-medium dark:text-white mb-2">
                                                روح الله امینی
                                            </h3>
                                            <ul className="-m-1 flex flex-wrap">
                                                <li className="p-1 leading-none">
                                                    <a href="#" className="text-xs font-medium dark:text-gray-300"> Twitter </a>
                                                </li>

                                                <li className="p-1 leading-none">
                                                    <a href="#" className="text-xs font-medium dark:text-gray-300"> GitHub </a>
                                                </li>

                                                <li className="p-1 leading-none">
                                                    <a href="#" className="text-xs font-medium dark:text-gray-300">Website</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="relative">

                                            <button onClick={handleOpen}
                                                className="p-2 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                            >
                                                ...
                                            </button>
                                            {isOpen ? (
                                                <div
                                                className="dropdown absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900"
                                                role="menu"
                                            >
                                                <div className="p-2">
                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:dark:text-gray-300"
                                                        role="menuitem"
                                                    >
                                                        مشاهده مخاطب
                                                    </a>

                                                    <a
                                                        href="#"
                                                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:dark:text-gray-300"
                                                        role="menuitem"
                                                    >
                                                        ویرایش مخاطب
                                                    </a>
                                                </div>

                                                <div className="p-2">
                                                    <form method="POST" action="#">
                                                        <button
                                                            type="submit"
                                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                                                            role="menuitem"
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
                                                    </form>
                                                </div>
                                            </div>
                                            ) : null}
                                            
                                        </div>
                                    </div>
                                </div>

                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <a href="#" className="block h-full rounded-lg border border-gray-700/20 p-4 hover:border-gray-400">
                                            <span className="font-medium text-xs dark:text-white"> شماره تماس : </span>

                                            <span className="mt-1 font-medium dark:text-gray-300">
                                                ۰۹۳۷۴۹۵۹۰۸۹
                                            </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" className="block h-full rounded-lg border border-gray-700/20 p-4 hover:border-gray-400">
                                            <span className="font-medium text-xs dark:text-white"> ایمیل : </span>

                                            <a href="mailto:r.amini3977@gmail.com" className="mt-1 font-medium dark:text-gray-300">
                                                r.amini3977@gmail.com
                                            </a>
                                        </a>
                                    </li>
                                </ul>
                            </article>
                        </div>
                    </div>
    )
}

export default Contact;