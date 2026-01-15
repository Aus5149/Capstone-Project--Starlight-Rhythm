
import './App.css'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage'
import MainMenuPage from './pages/MainMenuPage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthProvider'
import Uploadload from './pages/UploadImage'

function App() {
 
  return (
    <>
    <AuthContextProvider>

    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/upload" element={<Uploadload />} />
        <Route path="*" element={<MainMenuPage />} />
      </Routes>
    </BrowserRouter>
     </AuthContextProvider>
    </>
  )
}

export default App
