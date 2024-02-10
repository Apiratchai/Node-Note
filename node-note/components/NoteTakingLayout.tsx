"uses client"
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation"
import SideNavBar from "./SideNavBar_backup"
import HeadNavBar from "../components/HeadNavBar"
import { SearchCommand } from "./SearchCommand";


const NoteTakingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading...
            </div>
        )
    }
    if (!isAuthenticated) {
        return redirect("/");
    }
    return (
        <div className="h-screen flex ">
            <SideNavBar />
            <div className="flex-1 h-screen overflow-y-auto">
                <SearchCommand />
                {children}
            </div>
        </div>
    );
}

export default NoteTakingLayout;