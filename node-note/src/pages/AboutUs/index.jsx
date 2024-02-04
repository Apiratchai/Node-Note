import { useRouter } from "next/router";
import React from "react";
import { ArrowLeft } from "lucide-react";

function index() {
  const router = useRouter(); // Fixed: Added () to useRouter
  const goToLandPage = () => {
    router.push("../");
  };

  return (
    // min-h-screen this will make the last div always stick at the bottom
    <div className="flex flex-col min-h-screen">
      <div role="button"
        className="flex flex-row justify-start m-2"
        onClick={goToLandPage}>
        <ArrowLeft />
        <div className="font-semibold ml-2">back to Home</div>
      </div>
      <section className="w-screen flex-1 mt-12">
        <div className="flex justify-start items-center flex-col gap-6">
          <h5 className="font-bold text-4xl">Members</h5>
          <p className="text-2xl uppercase font-light">CoE33 Nodenote Group section2 friday
          </p>
          <p className="w-3/2 text-center text-2xl">1.Apiratchai Lakkum</p>
          <p className="w-3/2 text-center text-2xl">2.Kunasin Salabsri</p>
          <p className="w-3/2 text-center text-2xl">3.Achitapan Sutthiwanna</p>
        </div>
      </section>
    </div>
  )
}

export default index;
