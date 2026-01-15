import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Form, Button, Card } from "react-bootstrap";
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

    const handleLogin = async (e) =>{
    try{
        e.preventDefault();
         signInWithEmailAndPassword(auth, email, password)
         navigate("/upload")
    } catch (error) {
        console.error(error);
        setError(error.message);

    }
 
}

    return(
        <>
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <div className="header-container">
                    <h1 className="text-center my-4">Login to Starred Music</h1>
                    <Card
        className="p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
   <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
         
    <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              className="rounded-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <div className="text-danger text-center mb-2">{error}</div>}

          <Button
            type="submit"
            className="register-button w-100 rounded-pill mt-3"
          >
            Log In
          </Button>
</Form>
</Card>
                </div>
            </div>
        </div>




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