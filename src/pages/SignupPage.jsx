import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { AuthContext } from "../context/authContext";
import { useState, useEffect, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

const SignupPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const currentUser = useContext(AuthContext);

  const url =
    "https://2024be56-7c75-4898-bba3-bb654ca8b38a-00-iglx0rrqz7e8.sisko.replit.dev";

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (response.user) {
        const entry = await axios.post(`${url}/signup`, {
          email,
          id: response.user.uid,
        });
        navigate("/profile");
        console.log(entry.data);
      }
    } catch (error) {
      setError(error.message);
      console.error("error signing up");
    }
  };

  //BackGroundTransition component can be used here for background effects
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample background images - you can replace these with your own
  const backgrounds = [
    //'url("src/images/mock.png")',
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];

  // Auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/profile");
  //   }
  // }, [currentUser]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background layers for smooth transition */}
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: bg,
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              zIndex: index === currentIndex ? 1 : 0,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        ))}

        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <Card
              className="p-4 shadow"
              style={{
                maxWidth: "400px",
                width: "100%",
                borderRadius: "1rem",
                zIndex: 10,
                background:
                  "linear-gradient(180deg, #ff1ea1ff 20%, #a5226fff 40%, #c7003c8a 600%, #34001081 100%)",
              }}
            >
              <i
                className="bi bi-lock-fill"
                style={{ fontSize: "50px", color: "white" }}
              ></i>
              <div className="header-container">
                <h1
                  className="text-center my-4"
                  style={{
                    color: "#6300158a",
                    fontWeight: "bolder",
                  }}
                >
                  Create an account
                </h1>
              </div>

              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Email address
                  </Form.Label>
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
                  <Form.Label style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Create a password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    className="rounded-pill"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && (
                  <div className="text-danger text-center mb-2">{error}</div>
                )}

                <Button
                  type="submit"
                  className="register-button w-100 rounded-pill mt-3"
                  style={{ background: "#a80062ff", border: "none" }}
                >
                  Sign Up
                </Button>
              </Form>
              <div className="text-center mt-3">
                <small
                  style={{
                    color: "#ffd4dd8a",
                  }}
                >
                  Already have an account?{" "}
                  <a href="/login" className="register-text">
                    Log in
                  </a>
                </small>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* 
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignup}>Sign Up</button>
        <div>{error}</div>
      </div>
      */}
    </>
  );
};

export default SignupPage;
