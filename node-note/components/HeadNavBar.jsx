import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import classNames from "classnames";
import { useState } from "react";

export default function HeadNavBar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [isSelected, setIsSelected] = useState(false);
    const { user } = useUser();

    return (
        <div>
            <nav className="w-full grid grid-cols-3 px-10 py-2 bg-blue-300 justify-center items-center place-items-center z-200">
                <div className="flex flex-row gap-x-5 items-center">
                    <div className="font-bold text-2xl text-blue-800 pl-4">Node-Note</div>
                    <div className="flex w-75 rounded-full bg-white sm:flex hidden">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search"
                            className="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
                        />
                        <button className="m-1 rounded-full bg-blue-600 px-4 py-2 text-white">
                            Search
                        </button>
                    </div>
                </div>
                {/* Toggle button for small screens */}
                <div className="sm:hidden">
                    <div
                        role="button"
                        className={classNames("relative w-20 h-8 bg-gray-400 m-1 rounded-full flex justify-start", {
                            "justify-end": isSelected
                        })}
                        onClick={() => setIsSelected(!isSelected)}
                    >
                        <div className="h-8 w-8 bg-white rounded-full"></div>
                        <span
                            className={classNames("absolute top-2 text-white text-xs font-bold", {
                                "left-1": isSelected,
                                "right-1": !isSelected
                            })}
                            style={{ userSelect: 'none' }}
                        >
                            {isSelected ? "Note" : "Graph"}
                        </span>
                    </div>
                </div>
                {/* Toggle button for large screens */}
                <div className="hidden sm:block">
                    <div
                        role="button"
                        className={classNames("relative w-40 h-10 bg-gray-400 m-1 rounded-full flex justify-start", {
                            "justify-end": isSelected
                        })}
                        onClick={() => setIsSelected(!isSelected)}
                    >
                        <div className="h-10 w-14 bg-white rounded-full"></div>
                        <span
                            className={classNames("absolute top-2 text-black", {
                                "left-3": isSelected,
                                "right-3": !isSelected
                            })}
                            style={{ userSelect: 'none' }}
                        >
                            {isSelected ? "NoteView" : "GraphView"}
                        </span>
                    </div>
                </div>
                <div className="absolute right-0 top-1 flex flex-row items-center">
                    <div className="font-bold text-blue-800 mr-5 sm:flex hidden">
                        {user.fullName}
                    </div>
                    <div>
                        <UserButton />
                    </div>
                </div>
            </nav>
        </div>
    );
}