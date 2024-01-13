import { Main } from "next/document";
import Footer from "../../conponents/Footer";


export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <h1 className="text-white text-center">Homepage</h1>
            <Footer></Footer>
        </main>
    )
}