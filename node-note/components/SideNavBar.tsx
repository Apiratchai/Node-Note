
import { useUser } from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import classNames from "classnames";
import { ArrowLeft, CircleDotDashed, ChevronsLeft, MenuIcon, Search, PlusCircle, Trash, Dot, Home, CircleDashed, PlusCircleIcon, Plus, Divide } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useMutation, useQuery } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../convex/_generated/api";
import { useSearch } from "../hooks/useSearch";
import { useSettings } from "../hooks/useSettings";
import { DocumentList } from "./DocumentList";
import { Item } from "./Item";
import { Navbar } from "./Navbar";
import { SearchBox } from "./SearchBox";
import { TrashBox } from "./TrashBox";
import { UserSettingBox } from "./UserSettingBox";
import Link from "next/link";

export default function MyComponent() {
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useUser();

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const create = useMutation(api.documents.create);

  const documents = useQuery(api.documents.getTrash);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

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

    if (newWidth < 180 && newWidth > 150) newWidth = 190;
    if (newWidth < 260 && newWidth > 220) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (newWidth < 20) {
      setIsCollapsed(true);
      newWidth = 0;
    }
    // Update collapse state based on width
    if (newWidth > 10) setIsCollapsed(false);

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
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
      navbarRef.current.style.setProperty("width", "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", "240px");
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
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      {/* group classname is to wrap actions for group components */}
      <aside
        ref={sidebarRef}
        className={
          "group/sidebar h-full bg-gradient-to-t from-sky-100 via-white via-40% overflow-y-auto relative flex flex-col w-60 z-[999999] border-r border-solid border-black " +
          (isResetting ? "group transition-all ease-in-out duration-300" : "")
        }
      >
        <div
          role="button"
          className="h-8 w-8 rounded-sm hover:bg-transparent/5 absolute top-2 right-0 "
          onClick={collapse}
        >
          <ChevronsLeft />
        </div>
        <div className="flex font-semibold justify-center items-center border-b border-black w-full h-10 pr-3">
          <Link href={"/"}><Home className="pl-2 hover:bg-transparent/5 w-10" /></Link>

          <Popover>
            <PopoverTrigger className="w-full">
              <div className="w-full  hover:bg-transparent/5 ">{user.firstName + "'s Note"}</div>
            </PopoverTrigger>
            <PopoverContent className=" w-[200%] z-[9999999]" side={"right"}>
              <div className="text-sm bg-white border rounded-lg ml-2">
                <UserSettingBox />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Link href={"/documents"} className="hover:bg-transparent/5 mt-4 py-1 pl-3 flex flex-row   justify-between">
            <div className="flex">
              {pathname === "/documents" ? (
                <CircleDotDashed className="h-[22px] w-[22px] shrink-0 text-violet-600" />
              ) : (
                <CircleDashed className="h-[22px] w-[22px] shrink-0 text-violet-600" />
              )}
              <span className="ml-2 font-medium text-[14px] truncate text-violet-800">Graph View</span>
            </div>
            {pathname === "/documents" && (
              <Dot className="text-emerald-500 h-[60px] w-[60px] absolute right-0 top-9 mt-1 motion-reduce:animate-pulse " />
            )}
          </Link>
          <div className="hover:bg-transparent/5 text-blue-500">
            <Popover>
              <PopoverTrigger className="w-full">
                <Item label="Search" icon={Search} isSearch />
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[200%]" side={"right"}>
                <SearchBox />
              </PopoverContent>
            </Popover>
          </div>
          <div className="hover:bg-transparent/5 text-green-600">
            <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
          </div>
        </div>
        <div className="mt-4">
          <DocumentList />
          <Popover>
            <PopoverTrigger className="w-full mt-4 hover:bg-transparent/5">
              {filteredDocuments?.length === 0 ? (
                <div className="flex items-center w-full  disable:hover">
                  <Item label="Trash" icon={Trash} />
                  <p className="text-sm truncate w-full text-black pr-4">
                    Trash is empty.
                  </p>
                </div>
              ) : (
                <div className="flex items-center w-full text-red-500">
                  <Item label="Trash" icon={Trash} />
                </div>
              )}
            </PopoverTrigger>


            <PopoverContent className="p-0 w-72" side={"right"}>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div className="text-gray-500 font-semibold pt-40 pl-[10%]">
          <p>
            How to use Node-Note
          </p>
          <ul className="list-disc font-normal pt-3 text-sm">
            <li className=""> {/* Added flex and items-center for vertical alignment */}
              <Plus className="w-4 h-4 mr-2 text-green-500" /> {/* Added text-green-500 for green color */}
              Click the <span className="truncate">+ sign</span> next to a document to create a child document.
            </li>
            <li className="pt-2">
              <Trash className="w-4 h-4 mr-2 text-red-500" /> {/* Added text-red-500 for red color */}
              Deleted documents go to the Trash and can be restored.
            </li>
          </ul>
        </div>
        <div
          className="opacity-0 group-hover /sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-gray-400 right-0 top-0"
          onMouseDown={handleMouseDown}
        >
          {/* this only indicate that user can resize the sidebar */}
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={classNames(
          "absolute z-[99999] top-0 left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-5 py-5 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
