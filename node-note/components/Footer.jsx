import { useRouter } from "next/router";
import React, { useState } from 'react';
import ContactPopup from "./ContactPopup";


export default function Footer() {
    const [openContact, setOpenContact] = useState(false)
    const router = useRouter();
    const goToAboutUsPage = () => {
        router.push("/AboutUs")
    }
    return (
        <div className="flex flex-row justify-center ">

            <div>
                <button onClick={goToAboutUsPage} className="text-2xl cursor-pointer px-5 hover:text-white hover:bg-white hover:bg-opacity-25 text-blue-200 transition duration-500">
                    About Us
                </button>
            </div>
            <div>
                <button onClick={() => setOpenContact(true)} className="text-2xl cursor-pointer px-5 hover:text-white hover:bg-white hover:bg-opacity-25 text-blue-200 transition duration-500">
                    Contact Us
                </button>
                <div className="absolute invisible group-hover:visible bg-white shadow-md px-4 py-2 rounded-md text-sm">
                    Hi Hello
                </div>
                <ContactPopup open={openContact} onClose={() => setOpenContact(false)} />
            </div>
        </div>
    );
}
