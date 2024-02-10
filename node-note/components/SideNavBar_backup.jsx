import { Plus, ChevronsLeft, Menu, Search, PlusCircle, Trash } from "lucide-react"
import { useRef, useState } from "react"
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Item } from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { TrashBox } from "./TrashBox";
import { useParams } from "next/navigation";

export default function MyComponent() {
  const sideBarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useUser();

  const params = useParams();

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

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a note",
    })
  }

  return (
    <>
      {/* group classname is to wrap actions for group components */}
      <aside
        ref={sideBarRef}
        className={
          "group/sidebar h-screen bg-gray-300 overflow-y-auto relative flex flex-col w-60 z-[9999] " +
          (isResetting ? "group transition-all ease-in-out duration-300" : "")
        }
      >
        <div
          role="button"
          className="h-6 w-6 rounded-sm hover:bg-neutral-400 absolute top-3 right-2"
          onClick={collapse}
        >
          <ChevronsLeft />
        </div>
        <div className="flex font-semibold justify-center items-center border border-black w-full h-10 pr-3">
          <>{user.firstName + "'s Note"}</>
        </div>
        <div>
          <div className="bg-slate-400">
            <Item
              label="Search"
              icon={Search}
              isSearch
              onClick={() => { }} />
          </div>
          <Item
            onClick={onCreate}
            label="New page"
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item
            onClick={onCreate}
            icon={Plus}
            label="Add a page"
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={"right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-2 bg-gray-400 right-0 top-0">
          {/* this only indicate that user can resize the sidebar */}
        </div>
      </aside>
      {/* This will only appear if collapsed */}
      {isCollapsed && (
        <div className="bg-transparent absolute top-5 left-5"
          role="button"
          onClick={resetWidth}>
          <Menu />
        </div>
      )}
    </>
  );
}
