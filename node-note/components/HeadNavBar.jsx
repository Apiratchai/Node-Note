import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function HeadNavBar() {
    const { data: session } = useSession();
    const [view, setView] = useState("file"); // Default view is "Fileview"
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/"; 
    };

    const toggleView = () => {
        setView((prevView) => (prevView === "file" ? "graph" : "file"));
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="flex items-center justify-between border-b border-transparent bg-blue-500 text-white p-4">
            <div>
                <div className="text-xl font-bold border border-transparent p-2 rounded">Node-Note</div>
            </div>
            <div className="view-toggle">
                <button onClick={toggleView} className="text-sm px-4 py-2 bg-blue-500 text-white rounded">
                    {view === "file" ? "File View" : "Graph View"}
                </button>
            </div>
            <div className="flex items-center">
                {/* Additional content */}
                <div className="relative">
                    {session ? (
                        <>
                            <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {isDropdownOpen && (
                                <div className="absolute mt-2 bg-white text-black p-2 rounded shadow-lg">
                                    <button
                                        className="w-full text-left hover:bg-gray-200 px-4 py-2 inline-block"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        // You can add a login link or button here if needed
                        <span className="text-m pr-3">Please sign in</span>
                    )}
                </div>
                {session && <span className="ml-2 text-m pr-3">Welcome, {session.user.name}</span>}
            </div>
        </nav>
    );
}
