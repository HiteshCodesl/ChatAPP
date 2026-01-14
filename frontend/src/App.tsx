
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './components/dashboard/LandingPage';
import { SignupPage } from './components/dashboard/SignupPage';
import { LoginPage } from './components/dashboard/LoginPage';


function App() {
  return (
    <div className="min-h-screen bg-black">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='login' element={<LoginPage />} /> 
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
