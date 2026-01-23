import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
  CardBody,
  Image,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import bbbImage from "../images/StarlightRhythm.webp";
const Navbar = () => {
  const auth = getAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClose = () => setIsSidebarOpen(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#121212",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backgroundColor: "#000",
            color: "white",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {/**<div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#1DB954" }}
          >
            <span style={{ fontSize: "28px" }}></span> Starlight Rhythm
          </div>
          
          {/* Menu Button */}
          <Button
            variant="link"
            onClick={toggleSidebar}
            style={{
              color: "white",
              textDecoration: "none",
              padding: "8px",
              marginRight: "1px",
            }}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list" style={{ fontSize: "28px" }}></i>
          </Button>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              👤
            </div>
          </div>

          {/* Bootstrap Offcanvas Sidebar */}
          <Offcanvas
            show={isSidebarOpen}
            onHide={handleClose}
            placement="start"
            style={{
              backgroundColor: "#000",
              color: "white",
            }}
          >
            <Offcanvas.Header
              closeButton
              closeVariant="white"
              style={{ borderBottom: "1px solid #282828" }}
            >
              <Offcanvas.Title
                style={{ color: "#da007cff", fontWeight: "bold" }}
              >
                <span style={{ fontSize: "24px" }}>
                  <Image
                    src={bbbImage}
                    rounded
                    className="me-2 me-md-3 flex-shrink-0"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </span>{" "}
                Starlight Rhythm
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
              <Nav className="flex-column">
                {/* Explore */}
                <Nav.Link
                  onClick={() => {
                    navigate("/profile");
                    console.log("Navigate to Explore");
                    handleClose();
                  }}
                  className="text-white px-4 py-3"
                  style={{
                    fontSize: "16px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#282828")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <i
                    className="bi bi-compass me-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Explore
                </Nav.Link>

                {/* Library */}
                <Nav.Link
                  onClick={() => {
                    navigate("/library");
                    console.log("Navigate to Library");
                    handleClose();
                  }}
                  className="text-white px-4 py-3"
                  style={{
                    fontSize: "16px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#282828")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <i
                    className="bi bi-collection me-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Library
                </Nav.Link>

                <hr className="mx-4 my-3" style={{ borderColor: "#282828" }} />

                {/* Log Out */}
                <Nav.Link
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}
                  className="px-4 py-3"
                  style={{
                    fontSize: "16px",
                    color: "#ff4444",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#282828")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <i
                    className="bi bi-box-arrow-right me-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Log Out
                </Nav.Link>
              </Nav>

              {/* Footer */}
              <div
                className="mt-auto px-4 py-3"
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #282828",
                  fontSize: "12px",
                  color: "#b3b3b3",
                }}
              >
                <p className="mb-0">© Starred</p>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
