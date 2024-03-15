import { SignInButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import TypewriterTitle from "../../components/TypewritereTitle";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const goToNoteclick = () => {
    router.push("/documents")
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen transbg text-white">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <UserButton />
        </div>
        <main className="flex flex-col items-center justify-center text-center gap-y-5 flex-1 px-6 pb-10">
          <div className="mb-10">
            {/* above is margin bottom */}
            <h1 className="text-3xl sm:text-7xl md:text-9xl font-semibold">
              Node<span className="block">Note</span>
            </h1>
          </div>
          <div>
            <TypewriterTitle />
          </div>
          {isAuthenticated && !isLoading && (
            <div className="hover:cursor-pointer hover:-translate-y-1 bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-10 mt-10  text-3xl rounded-full border border-white-500 transition duration-500"
              onClick={goToNoteclick}>
              Go to note
            </div>
          )}
          {!isAuthenticated && !isLoading && (
            <SignInButton mode="modal">
              <div className="hover:cursor-pointer hover:-translate-y-1 bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-10 mt-10 rounded-full border border-white-500 transition duration-500">
                Sign in
              </div>
            </SignInButton>
          )}
          {isLoading && (
            <p className="button border-b items-center py-2 px-10 mt-10">
              Loading...
            </p>
          )
          }
        </main>
        <Footer />
      </div>
    </Layout>

  );
}
