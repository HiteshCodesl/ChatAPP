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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowBigRight } from "lucide-react";

interface DialogInterface {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function CreateRoomDialog({ isOpen, setIsOpen }: DialogInterface) {
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState('');

    const CreateRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("First Login to Create a Room")
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/room/create`, { roomName }, {
                headers: {
                    "Authorization": token,
                }
            });

            if (response.status === 201) {
                const roomId = response.data.data.roomId;
                console.log(roomId);
                navigate(`/chat/${roomId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Make a Room</DialogTitle>
                    <DialogDescription>
                        <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} className="text-semibold font-medium" placeholder="Enter a Room Name" />
                        <span className="gap-4 flex mt-3 w-full justify-end">
                            <Button>Cancel</Button>
                            <Button onClick={CreateRoom}>Create Room<ArrowBigRight /></Button>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
