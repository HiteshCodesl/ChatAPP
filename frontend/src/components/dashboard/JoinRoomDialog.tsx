import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input";
import { ArrowBigRight } from "lucide-react";
import { useSocket } from "../../config/socket";

interface DialogInterface {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function JoinRoomDialog({ isOpen, setIsOpen }: DialogInterface) {
    const { ws } = useSocket();
    const [roomName, setRoomName] = useState("");

    const sendMessage = async () => {
        console.log("joinRoom", roomName, ws);
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
