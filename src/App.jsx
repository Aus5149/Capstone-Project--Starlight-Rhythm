
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
import LibraryPage from './pages/LibraryPage'
import SidebarTest from './pages/SidebarTest'
import NavbarPage from './pages/NavbarPage'



function App() {
 
  return (
    <>
    <AuthContextProvider>

    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/testprofile" element={<ProfilePage />} />      
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/upload" element={<Uploadload />} />
        <Route path="/background" element={<BackgroundTransition />} />
        <Route path="/sidebar" element={<SidebarTest />} />
        <Route path="/profile" element={<MainProfilePage />} />

        <Route element={<NavbarPage/>}>
        <Route path="/library" element={<LibraryPage />} />
      </Route>
        <Route path="*" element={<BackgroundTransition />} />
      </Routes>
    </BrowserRouter>
     </AuthContextProvider>
    </>
  )
}

export default App
