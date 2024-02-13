import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import NoteTakingLayout from "../../../components/NoteTakingLayout";
import { api } from "../../../convex/_generated/api";

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
        {/* <HeadNavBar /> */}
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <div className="text-center animate-bounce duration-0"> {/* Added text-center class */}
            Nice to meet you here {user.firstName}
          </div>
          <div className="flex text-2xl text-blue-600 font-semibold justify-center items-center border border-black rounded-full w-60 h-14 hover:bg-gray-200 hover:-translate-y-1 transition ease-in-out duration-300"
            role="button"
            onClick={onCreate}>
            <PlusCircle className="h-8 w-8 mr-2 text-blue-600" />
            create note
          </div>
        </div>
      </div>
    </NoteTakingLayout>
  )
}
