import HeadNavBar from "../../../components/HeadNavBar";
import NoteTakingLayout from "../../../components/NoteTakingLayout"
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner";
import { useMutation } from "convex/react";

export default function Component() {
  const user = useUser();
  const create = useMutation(api.documents.create); //create api  
  const onCreate = () => {
    const promise = create({ title: "Untitled" })
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created",
      error: "Failed to create a note",
    })
  }
  return (
    <NoteTakingLayout>
      <div className="flex flex-col h-screen">
        <HeadNavBar />
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <div className="text-center animate-bounce duration-0"> {/* Added text-center class */}
            Nice to meet you here {user.firstName}
          </div>
          <div className="flex justify-center items-center border border-black rounded-full w-44 h-10 "
            role="button"
            onClick={onCreate}>
            <PlusCircle className="h-4 w-4 mr-2" />
            create note
          </div>
        </div>
      </div>
    </NoteTakingLayout>
  )
}
