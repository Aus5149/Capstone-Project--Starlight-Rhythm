
import './App.css'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage'
import MainMenuPage from './pages/MainProfilePage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthProvider'
import Uploadload from './pages/UploadImage'
import MainProfilePage from './pages/MainProfilePage'
import BackgroundTransition from './pages/BackgroundImageTest'
import { Library } from 'lucide-react'

function App() {
 
  return (
    <>
    <AuthContextProvider>

    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testprofile" element={<ProfilePage />} />
         <Route path="/profile" element={<MainProfilePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/upload" element={<Uploadload />} />
        <Route path="/background" element={<BackgroundTransition />} />
        <Route path="/library" element={<Library />} />
        
        
        <Route path="*" element={<MainMenuPage />} />
      </Routes>
    </BrowserRouter>
     </AuthContextProvider>
    </>
  )
}

export default App
