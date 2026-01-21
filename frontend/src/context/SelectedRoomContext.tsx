import React, { createContext, useState } from "react"

interface RoomInterface{
    roomId: string;
    isSelected: boolean;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
    roomName: string;
    setRoomName:  React.Dispatch<React.SetStateAction<string>>;
}

export const RoomContext = createContext<RoomInterface | null>(null);

export default function SelectedRoomContext({children} : {children: React.ReactNode}) {
    const [isSelected, setIsSelected] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
 
  return (
    <RoomContext.Provider value={{isSelected, roomId, setRoomId, setIsSelected, roomName, setRoomName}}>
        {children}
    </RoomContext.Provider>
  )
}


