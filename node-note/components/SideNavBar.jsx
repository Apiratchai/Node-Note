import { ChevronsLeft,Menu } from "lucide-react"
import { useRef, useState } from "react"

export default function MyComponent() {
  const sideBarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapse = () => {
    if (sideBarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sideBarRef.current.style.width = "0";
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };
  const resetWidth = () => {
    if (sideBarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sideBarRef.current.style.width = "240px";
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      {/* group classname is to wrap actions for group components */}
      <aside
        ref={sideBarRef}
        className={
          "group h-screen bg-gray-300 overflow-y-auto relative flex flex-col w-60 z-[9999] " +
          (isResetting ? "group transition-all ease-in-out duration-300" : "")
        }
      >
        <div
          role="button"
          className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-400 absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition group"
          onClick={collapse}
        >
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
      {/* This will only appear if collapsed */}
      {isCollapsed && (
        <div className="bg-transparent absolute top-0 left-0 p-4"
          role="button"
          onClick={resetWidth}>
          <Menu/>
        </div>
      )}
    </>
  );
}
