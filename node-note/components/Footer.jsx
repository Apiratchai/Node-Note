export default function Footer() {
    return (
        <div className="flex flex-row justify-center space-x-10">
            <div>
                <button className="hover:text-white text-blue-500 transition duration-500">
                    About Us
                </button>
            </div>
            <div >
                <button className="hover:text-white text-blue-500 transition duration-500">
                    Contact
                </button>
            </div>
        </div>
    );
}
