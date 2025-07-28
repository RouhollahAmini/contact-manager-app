import SearchContact from "./Contacts/SearchContact";

const Navbar = ({ query, search }) => {
    return (
        <nav className="shadow-md">
            <div className="container">
                <div className="flex items-center py-3">
                    <div className="hidden sm:block sm:w-1/2 md:w-1/3">
                        <h1 className="">
                            اپلیکیشن مدیریت&nbsp;
                            <span className="text-danger">مخاطبین</span>
                        </h1>
                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <div className="w-full sm:w-1/2 md:w-1/3">
                                <SearchContact query={query} search={search} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;