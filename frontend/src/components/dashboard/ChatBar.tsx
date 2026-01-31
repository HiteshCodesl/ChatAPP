import axios from "axios";
import { useEffect, useState } from "react";
import { useRoom } from "../../config/context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, LogIn, Plus, Send, UserMinus, UserPlus, UserRoundPlus } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSocket } from "../../config/socket";
import { ScrollArea } from "../ui/scroll-area";
import { getUserDetails } from "../../config/getUserDetails";
import AddUserDialog from "./AddUserDialog";
import { Link, useNavigate } from "react-router-dom";
import JoinRoomDialog from "./JoinRoomDialog";
import CreateRoomDialog from "./CreateRoomDialog";

interface ChatInterface {
  _id: string;
  message: string;
  user: UserInterface;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  profileUrl: string;
}

export default function ChatBar() {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const { roomId, isSelected, roomName } = useRoom();
  const [message, setMessage] = useState('');
  const { ws } = useSocket();
  const [userDetails, setUserDetails] = useState<UserInterface | null> (null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isJoinRoomDialogOpen, setIsJoinRoomDialogOpen] = useState(false);
  const [isCreateRoomDialogOpen, setIsCreateRoomDialogOpen] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      console.log("fetchChat activated")
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/chats?roomId=${roomId}`, {
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
  }, [isSelected, roomId])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetails();
      setUserDetails(data);
    } 
    fetchData();
  }, [])

  console.log("roomId", roomId)

  useEffect(() => {
    console.log("useEffect runnning");
    if (!ws) return () => console.log("ws not found");
    if(!roomId) return () => console.log("roomId not found");

    console.log("Ws in gettingCHat", ws);
    const handler = (msg: MessageEvent) => {
      console.log("MEssage",msg)

      const parsed = JSON.parse(msg.data);
      console.log("parsedCHAT", parsed);

      if (parsed.type === "CHAT") {
        setChats(prev => [...prev, 
          {_id: parsed._id, message:parsed.message, user: {
            _id: parsed.user._id,
            name: parsed.user.name,
            email: parsed?.user.email,
            profileUrl: parsed.user.profileUrl
          }}
        ])
      }
    }

    ws?.addEventListener("message", handler);

    return () => {
      ws?.removeEventListener("message", handler);
    };  
  }, [ws, roomId])

  const sendMessage = async () => {
    if (!message && !ws) {
      console.log("not message or ws")
      return;
    }
    console.log("ws in SendMessage", ws);
    console.log("message", message);
    ws?.send(JSON.stringify({
      "type": "CHAT",
      "message": message,
      "roomId": roomId
    }))
    setMessage("");
    console.log("Message successfully sended");
  }

  return (
   <div className="w-screen h-screen flex flex-col text-white">

  <div className="bg-zinc-700 py-5 px-8 text-xl shrink-0 flex flex-row justify-around items-center">
    <div>
    {roomName}
    </div>
    <div className="flex gap-8 flex-row items-center">
           <button onClick={() => setIsJoinRoomDialogOpen(true)} className="group bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all flex items-center space-x-2 shadow-xl">
            <span >Join Room</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button onClick={() => setIsCreateRoomDialogOpen(true)} className="bg-transparent text-white px-4 py-2 rounded-md font-semibold border-2 border-white/20 hover:border-white/40 transition-all flex items-center gap-1">
           <span>Create Room </span><Plus />
          </button>
    </div>
  </div>

  <ScrollArea className="flex-1 px-5 mt-5">
    <div className="flex flex-col gap-2 pb-5">
      {chats.map((chat) => (
        <div key={chat._id} className="flex items-center">

          <div className="flex flex-col gap-2">
            <img src={chat.user.profileUrl}  className="px-4  py-5 rounded-full w-16"/>
          </div>
         
          <div>
            <Badge>{chat.user.name}</Badge>
          <p className="p-2 text-md font-semibold">
            {chat.message}
          </p>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>

  <div className="bg-zinc-700 p-6 flex gap-4 shrink-0 sticky w-[87vw] items-center">
    <Input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="flex-1 py-5 border-[#27272A] bg-white text-black"
      placeholder="Enter a Message"
    />  
    <Button
    disabled={!isSelected}
      onClick={sendMessage}
      className="  hover:bg-[#6d28d9] rounded-full px-4 py-6 text-white"
    >
      <Send />
    </Button>
  </div>

  <AddUserDialog isOpen={isAddUserDialogOpen} setIsOpen={setIsAddUserDialogOpen} />
  <JoinRoomDialog isOpen={isJoinRoomDialogOpen} setIsOpen={setIsJoinRoomDialogOpen} />
  <CreateRoomDialog isOpen={isCreateRoomDialogOpen} setIsOpen={setIsCreateRoomDialogOpen} />
</div>

  )
}

