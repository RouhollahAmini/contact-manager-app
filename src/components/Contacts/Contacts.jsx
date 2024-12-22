import Contact from "./Contact";
import Spinner from "../Spinner";
import NotFound from "../../assets/NotFound.gif";
const Contacts = ({ contacts, loading }) => {
    return (
        <>
            <div className="container pt-5">
                <div className="flex">
                    <div>
                        <a
                            className="group relative inline-block text-sm font-medium text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            href="#"
                        >
                            <span
                                className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-xl bg-indigo-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                            ></span>

                            <button className="relative block border border-current rounded-xl bg-white px-3 py-1">
                                ساخت مخاطب جدید
                                <i className="fa-solid fa-user-plus mx-2 text-lg"></i>
                            </button>
                        </a>
                    </div>
                </div>
                <br />
                {loading ? <Spinner /> : (
                    <div className="flex justify-center">
                        {contacts.length > 0
                            ? contacts.map(c => (
                                <Contact key={c.id} contact={c} />
                            ))
                            : (
                                <div className="flex flex-col items-center gap-6">
                                    <img src={NotFound} alt="پیدا نشد" className="w-1/3" />
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