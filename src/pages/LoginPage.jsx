import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const auth = getAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const currentUser= useContext(AuthContext);

    const handleLogout = () => {
        auth.signOut()
    }

    const handleLogin = async () =>{
    try{
         signInWithEmailAndPassword(auth, email, password)
       
    } catch (error) {
        console.error(error);
        setError(error.message);

    }
 
}

    return(
        <>
      



        <div className="flex flex-col gap-1">
            <input 
            type="text"
            value={email}
            onChange={(e) => setEmail (e.target.value)}
            placeholder="Email"
            />
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword (e.target.value)}
            placeholder="Password"
            />
            {currentUser ? (
            <button onClick={handleLogout}>Logout</button> 
            ):(
            <button onClick={handleLogin}>Login</button>
            )}
        </div>
        </>
    )
}

export default LoginPage;