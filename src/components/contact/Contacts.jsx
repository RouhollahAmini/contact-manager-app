import Contact from "./Contact";
const Contacts = () => {
    return (
        <>
            <div className="container">
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
                <div className="flex">
                    {/* contact list */}
                    <Contact />
                </div>
            </div>
        </>
    )
}

export default Contacts;