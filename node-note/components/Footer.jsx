export default function Footer() {
    return (
        <div className="flex flex-row justify-center gap-x-10">
            <div>
                <button className="hover:text-green-400 text-whtie transition duration-500">
                    About Us
                </button>
            </div>
            <div >
                <button className="hover:text-black text-white transition duration-500">
                    Contact
                </button>
            </div>
        </div>
    );
}
