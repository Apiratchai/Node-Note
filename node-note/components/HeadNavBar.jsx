import { UserButton } from "@clerk/nextjs";

export default function HeadNavBar() {
    return (
        <nav className="flex flex-row px-3 pt-3 bg-blue-500 justify-between items-center">
            <div className="flex flex-row gap-x-10 items-center">
                <div className="font-bold">Node-Note</div>
                Search
                <div></div>
            </div>
            <div className="flex items-center">Toggle view</div>
            <div className="p-5 relative">
                <UserButton
                    className="rounded-full border-white border-4"
                    style={{ position: "absolute", right: "-10px" }}
                />
            </div>
        </nav>
    );
}
