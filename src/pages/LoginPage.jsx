import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const test = await signInWithEmailAndPassword(auth, email, password);
      // setCurrentUser(test.user.uid)
      //check user exist in neon (get)
      //post request to insert user data into neon
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [currentUser]);

  //BackGroundTransition component can be used here for background effects
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample background images - you can replace these with your own
  const backgrounds = [
    'url("https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2Fr7eQXmwdXGTxSCMgCEVY61ymGX23%2FScreenshot%202025-12-15%20164836.png?alt=media&token=60f063b4-1591-4070-a4af-96b95b06f5a2")',
    'url("src/images/mock.png")',
    'url("src/images/Test.webp")',
    "linear-gradient(135deg, #430000ff 0%, #58000cff 100%)",
    "linear-gradient(135deg, #040075ff 0%, #001a78ff 100%)",
    "linear-gradient(135deg, #004316ff 0%, #075500ff 100%)",
    "linear-gradient(135deg, #fa709a 0%, #320023ff 100%)",
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

        <div
          className="container d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          <div className="text-center">
            <Card
              className="p-4 shadow"
              style={{
                maxWidth: "400px",
                width: "100%",
                borderRadius: "1rem",
                zIndex: 10,
                background:
                  "linear-gradient(180deg, #a80062ff 50%, #ff005181 100%)",
              }}
            >
              <div className="header-container">
                <h1 className="text-center my-4">Login to Starred Music</h1>
              </div>

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

                {error && (
                  <div className="text-danger text-center mb-2">{error}</div>
                )}

                <Button
                  type="submit"
                  className="w-100 rounded-pill mt-3"
                  style={{ background: "#a80062ff", border: "none" }}
                >
                  Log In
                </Button>
              </Form>
              <div className="text-center mt-3">
                <small>
                  Don't have an account?{" "}
                  <a href="/signup" className="register-text">
                    Sign up
                  </a>
                </small>
              </div>
            </Card>
          </div>
        </div>
      </div>

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
        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </>
  );
};

export default LoginPage;
