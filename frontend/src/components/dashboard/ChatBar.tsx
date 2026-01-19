import axios from "axios";
import { useEffect, useState } from "react";
import { useRoom } from "../../config/context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Badge } from "../ui/badge";

interface ChatInterface{
  _id: string;
  message: string;
  user: UserInterface;
}

interface UserInterface {
  _id: string;
  name: string;
  email: string;
}

export default function ChatBar() {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const {roomId, isSelected } = useRoom();
console.log("roomId", roomId);

  useEffect(() => {
    const fetchChats = async() => {
      console.log("fetchChat activated")
     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/chats/${roomId}`, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
     });
     console.log("response",response);
     
     if(response.status === 201){
      const data = response.data.data;  
      console.log(data);
      setChats(data);
     }
  }
  console.log("calling a function");
  fetchChats();
  }, [isSelected, roomId])
  
  return (
    <div className="w-[50vw] border-r border-gray-600 text-xl text-white mt-5 mx-5 flex flex-col gap-2 h-screen ">
        {chats.map((chat) => (
          <div key={chat._id}>
               <Badge variant={'default'}>{chat.user.name}</Badge>
              <p className="p-2 border-white flex text-md text-white">{chat.message}</p>
          </div>
        ))}
        <div className="flex gap-2 items-center bottom-10 fixed" >
        <Input  className="w-[45vw] border-r-2" />
        <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] px-3.5 py-5  items-center rounded-full"><Send /></Button>
        </div>
    </div>
  )
}

