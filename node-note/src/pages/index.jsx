import { useSession, signIn, getSession } from "next-auth/react";
import Footer from "../../components/Footer";
import TypewriterTitle from "../../components/TypewritereTitle";
import Layout from "../../components/Layout";

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
    // Note: Navigation will be handled in the useEffect when the session is checked
  };

  return (

    <Layout>
      <div className="flex flex-col min-h-screen transbg">
        <main className="flex flex-col items-center justify-center text-center gap-y-5 flex-1 px-6 pb-10">
          <div className="mb-10">
            {/* above is margin bottom */}
            <h1 className="text-3xl sm:text-7xl md:text-8xl font-semibold">
              Node<span className="block">Note</span>
            </h1>
          </div>
          <div>
            <TypewriterTitle />
          </div>
          <div className="group">
            <button
              className="bg-transparent hover:bg-white hover:text-black text-white font-bold py-2 px-10 mt-10 rounded-full border border-white-500 transition duration-500"
              onClick={handleSignIn}>
                Sign in
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </Layout>

  );
}
