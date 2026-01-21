import axios from "axios";
import { useEffect, useState } from "react";
import { useRoom } from "../../config/context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Badge } from "../ui/badge";
import { useSocket } from "../../config/socket";

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
  const { roomId, isSelected, roomName } = useRoom();
  const [message, setMessage] = useState('');
  const { ws } = useSocket();

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
        console.log(data);
        setChats(data);
      }
    }
    console.log("calling a function");
    fetchChats();
  }, [isSelected, roomId])


  useEffect(() => {
    if (!ws) return;

    const handler = (msg: MessageEvent) => {

      const parsed = JSON.parse(msg.data);
      console.log("parsed", parsed);

      if (parsed.type === "CHAT") {
        setChats((prev) => [...prev, parsed.payload]);
      }
    }
    ws.addEventListener("message", handler);
    return () => {
      ws.removeEventListener("message", handler);
    };
  }, [ws])



  const sendMessage = async () => {
    if (!message || !ws) return;
    console.log("message", message)
    ws?.send(JSON.stringify({
      "type": "CHAT",
      "message": message
    }))
    setMessage("");
  }

  return (
    <div className=" w-screen text-xl text-white">


      <div className="bg-zinc-700 py-5 px-8 text-xl text-white">
        {roomName}
      </div>

      <div className=" mt-5  flex flex-col gap-2 h-screen ">
        {chats.map((chat) => (
          <div key={chat._id} className="mx-5">
            <Badge variant={'default'}>{chat.user.name}</Badge>
            <p className="p-2 border-white flex text-md font-semibold text-white">{chat.message}</p>
          </div>
        ))}
        <div className="flex items-center bottom-0 fixed gap-4 bg-zinc-700 p-6" >
          <Input value={message} onChange={(e) => setMessage(e.target.value)} className="w-[81vw] py-5 border-r-2" />
          <Button onClick={sendMessage} className="bg-zinc-600 hover:bg-[#6d28d9] px-4 py-6 items-center rounded-full"><Send /></Button>
        </div>
      </div>

    </div>
  )
}

