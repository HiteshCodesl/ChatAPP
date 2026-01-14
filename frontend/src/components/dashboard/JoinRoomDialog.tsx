import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight, Loader2 } from "lucide-react";


interface DialogInterface {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function JoinRoomDialog({ isOpen, setIsOpen }: DialogInterface) {
    const [roomName, setRoomName] = useState("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const webSocket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}/ws?token=${token}`)

    useEffect(() => {
        webSocket.onopen = () => {
            console.log("websocket connected");
            setWs(webSocket);
        }
    }, [])

    webSocket.onmessage = (evt) => {
        const message = evt.data;
        setMessages((prevMessages) => [...prevMessages, message])
    }

    const sendMessage = () => {
        ws?.send(JSON.stringify({
            "type": "JOIN_ROOM",
            "roomId": roomName
        }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a Room</DialogTitle>
                    <DialogDescription>
                        <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} className="text-semibold font-medium" placeholder="Enter a Room Name" />
                        <span className="gap-4 flex mt-3 w-full justify-end">
                            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button onClick={sendMessage}>Join Room<ArrowBigRight /></Button>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}
