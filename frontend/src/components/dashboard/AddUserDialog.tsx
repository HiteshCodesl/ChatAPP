import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface dialogInterface {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function AddUserDialog({ isOpen, setIsOpen }: dialogInterface) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Add Freind</DialogTitle>
                    <DialogDescription className="flex flex-col gap-3">
                         <Input placeholder="Enter a userId" className="text-md font-semibold text-black"/>
                         <Button className="w-full">Add Friend</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
