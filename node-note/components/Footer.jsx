export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full p-10 bg-base-200 text-base-content rounded">
            <nav className="flex items-center justify-center gap-2 mb-4">
                <a href="#" className="">
                    About us
                </a>
                <a href="#" className="">
                    Contact
                </a>
            </nav>

            <aside className="text-center mt-4">
                <p>This is a project for EN811301 Advance computer programming</p>
            </aside>
        </footer>
    );
}
