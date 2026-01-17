import { User } from "lucide-react";
import { Button } from "../ui/button";

export default function FriendSidebar() {
  return (
    <div className="md:border-r md:border-gray-600 flex  w-full lg:w-[12vw] absolute h-[150vh] ">
      <div className="mt-5 mx-auto">
        <div className="flex border text-white  border-black px-8  py-2 hover:bg-gray-900">{"userName"}<User /></div>
      </div>
    </div>
  )
}

