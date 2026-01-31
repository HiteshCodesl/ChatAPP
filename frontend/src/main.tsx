import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import SelectedRoomContext from './context/SelectedRoomContext.tsx'
import SelectWebSocket from './context/WebSocketContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <SelectedRoomContext>
    <SelectWebSocket>
    <App />
    </SelectWebSocket>
    <Toaster />
    </SelectedRoomContext>
  </StrictMode>
)
