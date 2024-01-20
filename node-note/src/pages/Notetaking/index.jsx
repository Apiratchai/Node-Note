import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import HeadNavBar from "../../../components/HeadNavBar";
import Footer from "../../../components/Footer";

export default function Component() {
  const { data: session } = useSession();
  const [view, setView] = useState("file"); // Default view is "Fileview"
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "file" ? "graph" : "file"));
  };

  if (session) {
    return (
      <>
      <HeadNavBar/>
      <Footer/>
      </>
    )
  }
}
