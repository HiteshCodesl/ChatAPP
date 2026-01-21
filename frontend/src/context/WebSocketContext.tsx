import React, { createContext, useState } from "react";

export interface SocketInterface{
    ws: WebSocket | null;
    setWs: React.Dispatch<React.SetStateAction<WebSocket | null>>;
}

export const SocketContext = createContext<SocketInterface | null>(null);

export default function SelectWebSocket({children}: {children: React.ReactNode }){
        const [ws, setWs] = useState<WebSocket | null>(null);

        return(
            <SocketContext.Provider value={{ws, setWs}}>
                {children}
            </SocketContext.Provider>
        )
}