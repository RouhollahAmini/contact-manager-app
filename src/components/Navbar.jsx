import SearchContact from "./Contacts/SearchContact";

const Navbar = () => {

    return (
        <nav className="shadow-md">
            <div className="container">
                <div className="flex items-center py-3">
                    <div className="hidden sm:block sm:w-1/2 md:w-1/3">
                        <a href="/">
                            <h1 className="">
                                اپلیکیشن مدیریت&nbsp;
                                <span className="text-red-600">مخاطبین</span>
                            </h1>
                        </a>
                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <div className="w-full sm:w-1/2 md:w-1/3">
                                <SearchContact />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;