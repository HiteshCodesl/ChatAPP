
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/dashboard/LandingPage';
import { SignupPage } from './components/dashboard/SignupPage';
import { LoginPage } from './components/dashboard/LoginPage';
import ChatRoom from './components/dashboard/ChatRoom';
import AppLayout from './components/dashboard/AppLayout';


function App() {
  return (
    <div className="min-h-screen bg-black">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} /> 
        <Route path='/room/:roomId' element={
        <AppLayout>
          <ChatRoom />
        </AppLayout>
        } />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
