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
import axios from "axios";
import { useRoom } from "../../config/context";
import { toast } from "sonner";

interface DialogInterface {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function JoinRoomDialog({ isOpen, setIsOpen }: DialogInterface) {
    const [name, setName] = useState("");
    const { setIsSelected, setRoomName, setRoomId } = useRoom();

    const requestJoinRoom = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/room/joinRoom`, { roomName: name }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })

            const data = response.data.data;
            const { roomId, roomName } = data;
            
            if (response.data) {
                setIsSelected(true);
                setRoomName(roomName);
                setRoomId(roomId);
            } else {
                toast(response.data.data.error);
            }
        } catch (err) {
            console.log(err);
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join a Room</DialogTitle>
                    <DialogDescription>
                        <Input value={name} onChange={(e) => setName(e.target.value)} className="text-semibold font-medium" placeholder="Enter a Room Name" />
                        <span className="gap-4 flex mt-3 w-full justify-end">
                            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button onClick={requestJoinRoom}>Join Room<ArrowBigRight /></Button>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}
