import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            if (response.user) {
                navigate('/login');
            }
        }catch(error){
            setError(error.message)
            console.error("error signing up")
        }
    }


    return(
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
    )
}

export default SignupPage;
