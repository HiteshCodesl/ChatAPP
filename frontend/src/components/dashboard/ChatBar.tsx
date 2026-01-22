import axios from "axios";
import { useEffect, useState } from "react";
import { useRoom } from "../../config/context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Plus, Send } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSocket } from "../../config/socket";
import { ScrollArea } from "../ui/scroll-area";
import { useParams } from "react-router-dom";

interface ChatInterface {
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
  const { isSelected, roomName } = useRoom();
  const [message, setMessage] = useState('');
  const { ws } = useSocket();
  const {roomId} = useParams();
  const [userDetails, setUserDetails] = useState<UserInterface | null> (null);

  useEffect(() => {
    const fetchChats = async () => {
      console.log("fetchChat activated")
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/chats/${roomId}`, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      });
      console.log("response", response);

      if (response.status === 201) {
        const data = response.data.data;
        setChats(data);
      }
    }
    console.log("calling a function");
    fetchChats();
  }, [isSelected])

  useEffect(() => {
    const getUserDetails = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        })
        const data = response.data.data;
        setUserDetails(data);
    } 
    getUserDetails();
  }, [])

  

  useEffect(() => {
    console.log("useEffect runnning");
    if (!ws) return () => console.log("ws not found");
    if(!roomId) return () => console.log("roomId not found");
    if(!userDetails) return () => console.log("userDetails not found");

    const handler = (msg: MessageEvent) => {
      const parsed = JSON.parse(msg.data);

      if (parsed.type === "CHAT") {
        setChats(prev => [...prev, 
          {_id: parsed._id, message:parsed.message, user: {
            _id: parsed.user._id,
            name: parsed.user.name,
            email: parsed?.user.email
          }}
        ])
      }
    }

    ws?.addEventListener("message", handler);

    return () => {
      ws?.removeEventListener("message", handler);
    };  
  }, [ws, isSelected])

  const sendMessage = async () => {
    if (!message && !ws) {
      console.log("not message or ws")
      return;
    }
    console.log("message", message);
    ws?.send(JSON.stringify({
      "type": "CHAT",
      "message": message
    }))
    setMessage("");
  }

  return (
   <div className="w-screen h-screen flex flex-col text-white">

  <div className="bg-zinc-700 py-5 px-8 text-xl shrink-0 flex flex-row justify-around items-center">
    <div>
    {roomName}
    </div>
    <div className="flex gap-8">
           <button className="group bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl">
            <span >Join Room</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button  className="bg-transparent text-white px-4 py-2 rounded-md font-semibold border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-1">
           <span>Create Room </span><Plus />
          </button>
    </div>


  </div>

  <ScrollArea className="flex-1 px-5 mt-5">
    <div className="flex flex-col gap-2 pb-5">
      {chats.map((chat) => (
        <div key={chat._id}>
          <Badge>{chat.user.name}</Badge>
          <p className="p-2 text-md font-semibold">
            {chat.message}
          </p>
        </div>
      ))}
    </div>
  </ScrollArea>

  <div className="bg-zinc-700 p-6 flex gap-4 shrink-0 sticky w-[87vw] items-center">
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 py-5 border-black"
      placeholder="Enter a Message"
    />  
    <Button
      onClick={sendMessage}
      className=" hover:bg-[#6d28d9] rounded-full px-4 py-6"
    >
      <Send />
    </Button>
  </div>

</div>

  )
}

