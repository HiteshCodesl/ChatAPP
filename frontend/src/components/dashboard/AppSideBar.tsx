import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar"

import { ScrollArea } from "../ui/scroll-area"
import { useEffect, useState } from "react"
import axios from "axios";
import { useRoom } from "../../config/context";
import { useSocket } from "../../config/socket";
import { getUserDetails } from "../../config/getUserDetails";
import type { UserInterface } from "./ChatBar";
import { Button } from "../ui/button";
import { ProfileDialog } from "./ProfileDialog";

interface Room {
  _id: string;
  roomName: string;
}

export default function AppSideBarComponent() {
  const { setRoomId, roomId, roomName, setIsSelected, setRoomName } = useRoom();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [userDetails, setUserDetails] = useState<UserInterface | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const { ws } = useSocket();

  useEffect(() => {
    const getAllTheRooms = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/room/getRooms`, {
        headers: {
          "Authorization": localStorage.getItem('token')
        }
      })

      if (response.status === 201) {
        const data = response.data.data;
        console.log("room", data);
        setRooms(data)
      }
    }
    getAllTheRooms();
  }, [ws]);

  useEffect(() => {
    if(rooms.find(x => x._id === roomId)) return;
    setRooms(prev => [...prev, {_id: roomId, roomName}])
  }, [roomId, roomName])  


  useEffect(() => {
    const sendMessage = async () => {
      console.log("Joined room", roomName)
      console.log("ws in join Room", ws);
      ws?.send(JSON.stringify({
        "type": "JOIN_ROOM",
        "roomId": roomName
      }))
    }
    sendMessage();
  }, [ws, roomName])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetails();
      setUserDetails(data);
    }
    fetchData();
  }, [])


  return (

    <div>
      <Sidebar className="bg-[#0B0F14]">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="mx-auto">
                  <div className="h-screen w-[10vw] flex flex-col">
                    <ScrollArea className="flex-1 p-4 overflow-y-auto">
                      {rooms?.map((room) => (
                        <div
                          key={room._id}
                          className="px-10 py-3 bg-[#18181B] hover:bg-[#818CF8] flex flex-col mt-2  rounded-md"
                        >
                          <p
                            onClick={() => {
                              setIsSelected(true);
                              setRoomId(room._id);
                              setRoomName(room.roomName)
                            }}
                            className="text-center text-md font-semibold cursor-pointer flex flex-col gap-3"
                          >
                            {room.roomName}
                          </p>
                        </div>
                      ))}
                    </ScrollArea>

                    <Button onClick={() => setIsProfileDialogOpen(true)} className="border-[#27272A] py-9  justify-around flex bottom-7  items-center hover:bg-[#818CF8] sticky ">
                      <div className="flex justify-start items-center gap-4">
                        <img src={userDetails?.profileUrl} className=" rounded-full size-10" />
                        <h1 className="text-md  font-semibold ">{userDetails?.name}</h1>
                      </div>

                    </Button>

                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {isProfileDialogOpen &&
        <ProfileDialog isOpen={isProfileDialogOpen} setIsOpen={setIsProfileDialogOpen} userDetails={userDetails} />
      }
    </div>
  )
}

