import { Link } from "react-router";

import { useContext } from "react";

import { ContactContext } from "../../context/contactContext";

import Contact from "./Contact";
import Spinner from "../Spinner";
import NotFound from "../../assets/NotFound.gif";
const Contacts = () => {

    const {filteredContacts, loading, deleteContact} = useContext(ContactContext);

    return (
        <>
            <div className="container pt-5">
                <div className="flex">
                    <div>
                        <div
                            className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        >
                            <span
                                className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-xl bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                            ></span>

                            <Link to={"/contacts/add"} className="relative block border border-current rounded-xl bg-white px-3 py-1">
                                ساخت مخاطب جدید
                                <i className="fa-solid fa-user-plus mx-2 text-lg"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <br />
                {loading ? <Spinner /> : (
                    <div className={ filteredContacts.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}>
                        {filteredContacts.length > 0
                            ? filteredContacts.map(c => (
                                <Contact key={c.id} contact={c} deleteContact={()=> deleteContact(c.id, c.fullname)} />
                            ))
                            : (
                                <div className="flex flex-col items-center gap-6">
                                    <img src={NotFound} alt="پیدا نشد" className="w-1/6" />
                                    <p className="text-xl">
                                        مخاطب یافت نشد ...
                                    </p>
                                </div>
                            )}
                    </div>
                )
                }

            </div>
        </>
    )
}

export default Contacts;