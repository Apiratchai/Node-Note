import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import TypewriterTitle from "../../components/TypewritereTitle";
import Layout from "../../components/Layout";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const updatedSession = await getSession();
      if (updatedSession) {
        // Only set shouldNavigate if it's not already true
        if (!shouldNavigate) {
          setShouldNavigate(true);
        }
      } else {
        setTimeout(checkSession, 200);
      }
    };

    checkSession();
  }, [shouldNavigate]);

  useEffect(() => {
    if (shouldNavigate) {
      router.push('/Notetaking');
      // Reset shouldNavigate to false after navigating
      setShouldNavigate(false);
    }
  }, [shouldNavigate, router]);

  const handleSignIn = async () => {
    await signIn();
    // Note: Navigation will be handled in the useEffect when the session is checked
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen transbg">
        <main className="flex-grow flex flex-col items-center justify-center">
          <div className="mb-8">
            <h1 className="font-semibold text-7xl text-center">
              Node<span className="block">Note</span>
            </h1>
          </div>
          <div>
            <TypewriterTitle />
          </div>
          <div className="group">
            <button
              className="bg-transparent hover:bg-white hover:text-black text-white font-bold py-2 px-10 mt-10 rounded-full border border-white-500 transition duration-500"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </Layout>
  );
}
