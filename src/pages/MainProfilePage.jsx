import { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
import { AuthContext } from "../context/authContext";
const CLIENT_ID = "ee89ebc6c60b482889ad000b20b14608";
const CLIENT_SECRET = "3cfd4e2e837d4b07b610e2865f1d3099";

const ProfilePage = () => {
  const auth = getAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, authLoading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClose = () => setIsSidebarOpen(false);

  useEffect(() => {
    // API access token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch((error) => console.error("Error fetching access token:", error));
  }, []);

  async function search() {
    setIsLoading(true);
    console.log("Searching for " + searchQuery);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchQuery + "&type=artist",
      searchParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log("Artist ID is " + artistID);

    var songs = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/top-tracks" +
        "?include_groups=album&market=US&limit=50",
      searchParameters,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSongs(data.tracks);
      });
    setIsLoading(false);
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  }, [currentUser, authLoading]);

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
            backgroundColor: "#000",
            color: "white",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <div
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

          <div style={{ flex: "0 1 500px", margin: "0 20px" }}>
            <input
              type="search"
              placeholder="Search for songs, artists, albums..."
              value={searchQuery}
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  search();
                }
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: "20px",
                border: "1px solid #333",
                backgroundColor: "#282828",
                color: "white",
                outline: "none",
              }}
            />
          </div>

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
              <Offcanvas.Title style={{ color: "#1DB954", fontWeight: "bold" }}>
                <span style={{ fontSize: "24px" }}>🎵</span> Menu
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
                <p className="mb-0">© 2024 Spotify Clone</p>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </nav>

        {/* Web */}

        {/* old layer */}

        <div style={{ color: "#b3b3b3" }}>
          {isLoading ? (
            "Loading Songs"
          ) : (
            <Container>
              <Row className="mx-2 row row-cols-1">
                {songs.map((songs) => {
                  console.log(songs);
                  return (
                    <div key={songs.id}>
                      <Card className="my-1">
                        <Image
                          src={songs.album.images[0].url}
                          rounded
                          className="me-3-shrink-0"
                          style={{
                            width: "56px",
                            height: "56px",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body>
                          <Card.Title>{songs.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
