import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { UserPen } from "lucide-react";
import type { UserInterface } from "./ChatBar";


interface dialogInterface {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    userDetails: UserInterface | null;
}

export function ProfileDialog({ isOpen, setIsOpen, userDetails }: dialogInterface) {
    const [file, setFile] = useState();
    const [profilePic, setProfilePic] = useState();

        const handleUploadProfilePic = async () => {
            if (!file) {
                console.log("image not imported");
                return;
            }
            console.log("inside handleUpload");
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/upload`, formData, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })

            const data = response.data.imageUrl;
            setProfilePic(data);
        }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center mx-auto flex items-center gap-2 border p-2 bg-[#818CF8] rounded-sm text-black">Update Profile<UserPen /></DialogTitle>
                    <DialogDescription >
                        <div className="flex items-center gap-12">
                           <div className="flex flex-col gap-2">
                            <img className="px-3 py-4 rounded-full w-28" src={userDetails?.profileUrl} />
                            <Input onChange={(e) => setFile(e.target.files[0])} accept="image/*" type="file" className=" border-dashed border-black rounded-full w-32 bottom-2" placeholder="Change Profie Photo" title="Change Profie Photo" /> 
                            <Button onClick={handleUploadProfilePic}>Change Profile</Button>   
                           </div>  
                       
                        <div className="flex  flex-col gap-8">
                            <div className="flex flex-col gap-1">
                                <h1>Change Name</h1>
                                <Input placeholder={userDetails?.name} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1>Change Password</h1>
                                <Input placeholder="Enter Current Password" />
                            </div>
                        </div>
                         </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
