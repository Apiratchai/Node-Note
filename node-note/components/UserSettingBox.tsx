import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { SignOutButton } from "@clerk/nextjs";

export const UserSettingBox = () => {
    const { user } = useUser();

    return (
        <div className="text-sm bg-white border border-gray-300 rounded-lg w-auto">
            {/* User Profile */}
            <div className="flex items-center gap-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                {user.imageUrl && <img src={user.imageUrl} alt="Profile" className="h-8 w-8 rounded-full" />}
                <span className="truncate">{user.fullName}</span>
            </div>

            {/* Sign Out */}
            <div className="flex items-center gap-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                <SignOutButton />
            </div>
        </div>
    );
}

export default UserSettingBox;
