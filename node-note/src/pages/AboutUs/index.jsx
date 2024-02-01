import { useRouter } from "next/router";
import React from "react";

function index() {
  const router = useRouter;
  const goToLandPage = () => {
    router.push("index.jsx");
  };

  return(
      <div className="flex flex-col min-h-screen transbg text-white">
        <div className="absolute top-0 right-0 mt-4 mr-4">
        </div>
        <main className="flex flex-col items-center justify-center text-center gap-y-5 flex-1 px-6 pb-10">
          <div className="mb-10">
            {/* above is margin bottom */}
            <h1 className="text-3xl sm:text-7xl md:text-8xl font-semibold">
              Node<span className="block">Note</span>
            </h1>
          </div>
          <div>
          </div>
            <div className="hover:cursor-pointer hover:-translate-y-1 bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-10 mt-10 rounded-full border border-white-500 transition duration-500"
              onClick={goToLandPage}>
              Go to note
            </div>
        </main>
      </div>
  );
}

export default index;
