import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "../../../components/Footer";

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"; // Redirect to the root ("/") page
  };

  if (session) {
    return (
      <div className="navbar flex-row mainbg">
        {/* ... (existing code for signed-in users) ... */}
        <button className="btn btn-primary" onClick={handleSignOut}>
          sign out
        </button>
      </div>
    );
  }

  // Redirect to the Home page if not signed in
  const handleSignIn = async () => {
    await signIn();
    router.push("/Home");
  };
}
