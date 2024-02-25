import { Plus, ChevronsLeft, MenuIcon, Search, PlusCircle, Trash } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser, UserButton } from "@clerk/nextjs";
import { Item } from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { TrashBox } from "./TrashBox";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Navbar } from "./Navbar";
import classNames from "classnames";
import { SearchBox } from "./SearchBox"
import { UserSettingBox } from "./UserSettingBox"
import { useSearch } from "../hooks/useSearch";
import { useSettings } from "../hooks/useSettings";

export default function MyComponent() {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useUser();

  const router = useRouter();
  const settings = useSettings();
  const search = useSearch();
  const params = useParams();
  const pathname = usePathname();
  const create = useMutation(api.documents.create);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = "240px";
      navbarRef.current.style.setProperty(
        "width",
        "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        "240px"
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  }


  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  };

  return (
    <>
      {/* group classname is to wrap actions for group components */}
      <aside
        ref={sidebarRef}
        className={
          "group/sidebar h-full bg-gray-200 overflow-y-auto relative flex flex-col w-60 z-[999999] " +
          (isResetting ? "group transition-all ease-in-out duration-300" : "")
        }
      >
        <div
          role="button"
          className="h-6 w-6 rounded-sm hover:bg-transparent/5 absolute top-3 right-2 "
          onClick={collapse}
        >
          <ChevronsLeft />
        </div>
        <div className="flex font-semibold justify-center items-center border border-black w-full h-10 pr-3 hover:bg-transparent/5">
          <Popover >
            <PopoverTrigger className="w-full">
              <div className="w-full">
                {user.firstName + "'s Note"}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className=" w-[200%]"
              side={"right"}
            >
              <div className="text-sm bg-white ml-3 border border-gray-300 rounded-r-lg hover:bg-transparent/5">
                <UserSettingBox/>
              </div>
            </PopoverContent>
          </Popover>

        </div>
        <div>
          <div className="hover:bg-transparent/5">
            <Popover>
              <PopoverTrigger className="w-full">
                <Item label="Search" icon={Search} isSearch />
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[200%]"
                side={"right"}
              >
                <SearchBox />
              </PopoverContent>
            </Popover>
          </div>
          <div className="hover:bg-transparent/5">
            <Item
              onClick={handleCreate}
              label="New page"
              icon={PlusCircle}
            />
          </div>
        </div>
        <div className="mt-4">
          <DocumentList />
          <Popover>
            <PopoverTrigger className="w-full mt-4 hover:bg-transparent/5">
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
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-gray-400 right-0 top-0">
          {/* this only indicate that user can resize the sidebar */}
        </div>
      </aside >
      <div
        ref={navbarRef}
        className={classNames(
          "absolute z-[99999] top-0 left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-5 py-5 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6" />}
          </nav>
        )}
      </div>
    </>
  );
}
