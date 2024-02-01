import React, { useState } from 'react';
import ContactPopup from "./ContactPopup";

export default function Footer() {
    const [openContact, setOpenContact] = useState(false)
    
    return (
        <div className="flex flex-row justify-center ">
            <div>
            <button className="cursor-pointer px-5 hover:text-white hover:bg-white hover:bg-opacity-25 text-blue-500 transition duration-500">
                    About us
                </button>
            </div>
            <div>
                <button onClick={() => setOpenContact(true)} className="cursor-pointer px-5 hover:text-white hover:bg-white hover:bg-opacity-25 text-blue-500 transition duration-500">
                    Contact Us
                </button>
                <ContactPopup open={openContact} onClose={() => setOpenContact(false)}/>
            </div>
        </div>
    );
}
