import SearchContact from "./contact/SearchContact";

const Navbar = () => {
    return (
        <nav className="shadow-md bg-fourthColor">
            <div className="container">
                <div className="flex items-center py-3">
                    <div className="w-1/2 md:w-1/3">
                        <h1 className="font-bold">
                            وب اپلیکیشن مدیریت {" "}
                            <span className="text-danger">مخاطبین</span>
                        </h1>
                    </div>
                    <div className="w-1/2 md:w-1/3">
                        <SearchContact />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;