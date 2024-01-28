import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function HeadNavBar() {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div>
            <nav className="grid grid-cols-3 px-5 pt-0 bg-blue-300 justify-center items-center place-items-center">
                <div className="flex flex-row gap-x-5 items-center">

                    <div className="font-bold text-2xl">Node-Note</div>


                    <div class=" flex w-75 rounded-full bg-white">
                        <input type="search"
                            name="search"
                            id="search"
                            placeholder="Search"
                            class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
                        />
                        <button class="m-1 rounded-full bg-blue-600 px-4 py-2 text-white">
                            Search
                        </button>
                    </div>

                </div>

                <div>
                    <div class="flex justify-end mb-3">
                        <div id="toggle-count" class="p-0.5 inline-block bg-gray-100 rounded-lg dark:bg-gray-700">
                            <label for="toggle-count-monthly" class="relative inline-block py-2 px-3">
                                <span class="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
                                    NoteView
                                </span>
                                <input id="toggle-count-monthly" name="toggle-count" type="radio" class="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-gray-800 dark:focus:ring-offset-transparent" />
                            </label>
                            <label for="toggle-count-annual" class="relative inline-block py-2 px-3">
                                <span class="inline-block relative z-10 text-sm font-medium text-gray-800 cursor-pointer dark:text-gray-200">
                                    GraphView
                                </span>
                                <input id="toggle-count-annual" name="toggle-count" type="radio" class="absolute top-0 end-0 w-full h-full border-transparent bg-transparent bg-none text-transparent rounded-lg cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:rounded-lg focus:ring-offset-0 checked:before:bg-white checked:before:shadow-sm checked:bg-none focus:ring-transparent dark:checked:before:bg-gray-800 dark:focus:ring-offset-transparent" checked />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="p-5 relative">
                    <UserButton
                        className="rounded-full border-white border-4 h-10 px-5 m-2"
                        style={{ position: "absolute", right: "-10px" }}
                    />
                </div>
            </nav>
        </div>
    );
}
