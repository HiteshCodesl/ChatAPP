import { useContext } from "react";
import { RoomContext } from "../context/SelectedRoomContext";

export const useRoom = () => {
    const context = useContext(RoomContext);

    if(!context){
        throw new Error("useRoom must be used inside SelectedRoomContext");
    }

    return context;
}