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
import { toast } from "sonner";

interface dialogInterface {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    userDetails: UserInterface | null;
}

export function ProfileDialog({ isOpen, setIsOpen, userDetails }: dialogInterface) {
    const [file, setFile] = useState();
    const [profilePic, setProfilePic] = useState();
    const [name, setName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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

    const changeName = async () => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update`, { name }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        if (response.status === 201) {
            toast.success(response.data.data);
        } else {
            toast.error(response.data.error)
        }
        setName('');
    }

    const changePassword = async () => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update`, { password: { oldPassword, newPassword } }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        if (response.status === 201) {
            toast.success(response.data.data);
        } else {
            toast.error(response.data.error);
        }
        setNewPassword('');
        setOldPassword('');
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center mx-auto flex items-center gap-2 mb-2 p-2 rounded-sm text-black">Update Profile<UserPen /></DialogTitle>
                    <DialogDescription >
                        <p className="font-semibold text-center p-12">UserId - {userDetails?._id}</p>
                        <div className="flex items-center gap-12">
                            <div className="flex flex-col gap-2">
                                <img className="px-3 py-4 rounded-full w-28" src={userDetails?.profileUrl} />
                                <Input onChange={(e) => setFile(e.target.files[0])} accept="image/*" type="file" className=" border-dashed border-black rounded-full w-32 bottom-2" placeholder="Change Profie Photo" title="Change Profie Photo" />
                                <Button onClick={handleUploadProfilePic}>Change Profile</Button>
                            </div>

                            <div className="flex  flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <h1>Change Name</h1>
                                    <Input placeholder={userDetails?.name} value={name} onChange={(e) => setName(e.target.value)} />
                                    <Button onClick={changeName}>Change Name</Button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1>Change Password</h1>
                                    <Input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter Old Password" />
                                    <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
                                    <Button onClick={changePassword}>Change Password</Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
