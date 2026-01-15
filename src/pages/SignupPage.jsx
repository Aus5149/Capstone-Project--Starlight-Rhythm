import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { Form, Button, Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        try{
            e.preventDefault();
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response.user) {
                navigate('/upload');
            }
        }catch(error){
            setError(error.message)
            console.error("error signing up")
        }
    }


    return(
<>
<div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <div className="header-container">
                   <h1 className="text-center my-4">Sign up to Starred Music</h1>
                    
                     <Card
        className="p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
                    <Form onSubmit={handleSignup}>
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
            <Form.Label>Create a password</Form.Label>
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
            Sign Up
          </Button>
        </Form>
                </Card>    
                    
                    </div>
            </div>
        </div>











        <div className='flex flex-col gap-1'>
            <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            />
            <input
            type='password'
            value={password}
            onChange={(e) => setPassword (e.target.value)}
            placeholder='Password'
            />
            <button onClick={handleSignup}>Sign Up</button>
<div>
    {error}
</div>

        </div>
        </>
    )
}

export default SignupPage;
