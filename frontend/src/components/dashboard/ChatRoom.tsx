import { useEffect } from "react";
import AppSideBarComponent from "./AppSideBar";
import ChatBar from "./ChatBar";
import { useSocket } from "../../config/socket";

export default function ChatRoom() {
  const { ws, setWs } = useSocket();
  const token = localStorage.getItem("token");
  const webSocket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/ws?token=${token}`);

  useEffect(() => {

    webSocket.onopen = () => {
      console.log("websocket connected");
      setWs(webSocket);
    }

    webSocket.onclose = () => {
      ws?.close();
      console.log("websocket closed");
    }
  }, [])

  return (
    <div className="bg-[#09090B] w-screen h-[150vh] overflow-hidden ">
      <AppSideBarComponent />
      <div className="absolute">
        <ChatBar />
      </div>

    </div>
  )
}

