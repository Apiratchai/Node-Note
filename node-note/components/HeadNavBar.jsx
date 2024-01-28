import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import classNames from "classnames";
import { useState } from "react";

export default function HeadNavBar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div>
            <nav className="grid grid-cols-3 px-5 py-2 bg-blue-300 justify-center items-center place-items-center">
                <div className="flex flex-row gap-x-5 items-center">
                    <div className="font-bold text-2xl">Node-Note</div>
                    <div className="flex w-75 rounded-full bg-white">
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
                <div
                    role="button"
                    className={classNames("relative w-40 h-10 bg-gray-600 m-1 rounded-full flex justify-start", {
                        "justify-end": isSelected
                    })}
                    onClick={() => setIsSelected(!isSelected)}>
                    <div className="h-10 w-14 bg-white rounded-full"></div>
                    <span
                        className={classNames("absolute top-2 text-white", {
                            "left-3": isSelected,
                            "right-3": !isSelected
                        })}
                        style={{ userSelect: 'none' }}
                    >
                        {isSelected ? "Noteview" : "Graphview"}
                    </span>
                </div>


                <div className="absolute right-5">
                    <UserButton
                        className="rounded-full border-white border-4 h-10 px-5 m-2"
                        style={{ position: "absolute", right: "-10px" }}
                    />
                </div>
            </nav>
        </div>
    );
}
