import { useConvexAuth } from "convex/react";
import SideNavBar from "./SideNavBar";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";

const NoteTakingLayout = ({ children }: { children: React.ReactNode; }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter(); // Moved inside the component

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Spinner className="lg animate-spin"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect on the client side
        router.push("/");
        return null; // Prevent rendering the rest of the component
    }

    return (
        <div className="h-screen flex">
            <SideNavBar />
            <div className="flex-1 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default NoteTakingLayout;
