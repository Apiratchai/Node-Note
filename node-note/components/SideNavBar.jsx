import { ChevronsLeft } from "lucide-react"
import { useRef, useState } from "react"
import { cn } from "../@/lib/utils";

export default function MyComponent() {
  const isResizingRef = useRef(false);
  const sideBarRef = useRef(null); // Remove the type annotation
  const navBarRef = useRef(null); // Remove the type annotation
  const [isResetting, setIsResetting] = useState(false); // Correct the useState usage

  return (
    <>
      {/* group classname is to wrap actions for group components */}
      <aside
        ref={sideBarRef}
        className={cn(
          "group h-screen bg-gray-300 overflow-y-auto relative flex flex-col w-60 z-[9999]",
          isResetting && "group transition-all ease-in-out duration-300"
        )}
      >

        <div role="button" className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-400 absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition group">
          <ChevronsLeft />
        </div>

        <div>
          <p>Action item</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition cursor-ew-resize absolute h-full w-2 bg-gray-400 right-0 top-0">
          {/* this only indicate that user can resize the sidebar */}
        </div>
      </aside>
    </>
  )
}
