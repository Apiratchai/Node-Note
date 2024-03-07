import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/Layout";

function Index() {
  const router = useRouter();
  const goToLandPage = () => {
    router.push("../");
  };
  return (
    <div className="flex flex-col min-h-screen bg-blend-color-burn bg-green-600 bg-opacity-70">
      <div
        role="button"
        className="flex flex-row justify-start m-2 text-white"
        onClick={goToLandPage}
      >
        <ArrowLeft />
        <div className="font-semibold ml-2">back to Home</div>
      </div>
      <Layout>
        <section className="w-screen flex-1 mt-12">
          <div className="flex justify-start items-center flex-col gap-6 text-white">
            <h5 className="text-4xl">Members</h5>
            <p className="text-2xl uppercase font-light">
              CoE33 Nodenote Group section 2 friday
            </p>
            <div className="flex justify-start items-start flex-col gap-6">
              <li className="w-3/2 text-center text-2xl list-decimal">
                Apiratchai Lakkum
              </li>
              <li className="w-3/2 text-center text-2xl list-decimal">
                Kunasin Salabsri
              </li>
              <li className="w-3/2 text-center text-2xl list-decimal">
                Achitapan Sutthiwanna
              </li>
            </div>
            <h5 className="mt-10 text-3xl">Nodenote Features</h5>
            <div className="flex justify-center items-center">
              <div className="flex justify-start items-start flex-col gap-6">
                <p className="w-3/2 text-xl ">Sign in with Google Account</p>
                <p className="w-3/2 text-xl ">Notetaking Space</p>
                <li className="w-3/2 text-base list-disc">Support pictures</li>
                <p className="w-3/2 text-xl ">Catagorizing and Visualization</p>
                <li className="w-3/2 text-base list-disc">
                  Force directed graph view (node-like structure)
                </li>
                <p className="w-3/2 text-xl ">Sharing</p>
                <li className="w-3/2 text-base list-disc">Read only format</li>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}

export default Index;
