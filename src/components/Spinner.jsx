import SpinnerGif from "../assets/Spinner2.gif";

const Spinner = () => {
    return (
        <>
            <div className="container">
                <div className="flex justify-center items-center w-1/4 mx-auto m-4">
                    <img src={SpinnerGif} alt="لطفا صبر کنید" className="w-8 mx-auto" />
                </div>
            </div>
        </>
    )
}

export default Spinner;