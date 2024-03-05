import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const router = useRouter();
  const goToLandPage = () => {
    router.push("../");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div
        role="button"
        className="flex flex-row justify-start m-2"
        onClick={goToLandPage}
      >
        <ArrowLeft />
        <div className="font-semibold ml-2">back to Home</div>
      </div>
      <section className="w-screen flex-1 mt-12">
        <div className="flex justify-start items-center flex-col gap-6">
          <h5 className="font-bold text-4xl">Members</h5>
          <p className="text-2xl uppercase font-light">
            CoE33 Nodenote Group section2 friday
          </p>
          <div className="flex justify-start items-start flex-col gap-6">
            <p className="w-3/2 text-center text-2xl">1. Apiratchai Lakkum</p>
            <p className="w-3/2 text-center text-2xl">2. Kunasin Salabsri</p>
            <p className="w-3/2 text-center text-2xl">3. Achitapan Sutthiwanna</p>
          </div>
          <h5 className="font-bold text-3xl gap-y-5">Nodenote's Features</h5>
          <div className="flex justify-center items-center">
            <div className="flex justify-start items-start flex-col gap-6">
              <p className="w-3/2 text-xl ">Sign in with Google Account</p>
              <p className="w-3/2 text-xl ">Notetaking Space</p>
              <li className="w-3/2 text-base list-disc">Support pictures</li>
              <p className="w-3/2 text-xl ">Catagorizing and Visualization</p>
              <li className="w-3/2 text-base list-disc">
                Force directed graph view (node-like structure)
              </li>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
