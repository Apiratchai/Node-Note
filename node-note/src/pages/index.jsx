// components/Home.js
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import TypewriterTitle from "../../components/TypewritereTitle";
import Layout from "../../components/Layout";  // Import Layout component

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignIn = async () => {
        // Sign in directly without using a pop-up
        await signIn();

        // Wait for the session to update
        const checkSession = async () => {
            const updatedSession = await getSession();
            if (updatedSession) {
                router.push('/Notetaking');
            } else {
                setTimeout(checkSession, 200); // Check again after 200 milliseconds
            }
        };

        checkSession(); // Start checking for the updated session
    };

    // Check if the user is signed in and redirect
    if (session) {
        router.push('/Notetaking');
        return null; // Prevent rendering anything else in this case
    }

    return (
        <Layout>  {/* Wrap your content in the Layout component */}
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
                    {/* Greet users who are not signed in */}
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
