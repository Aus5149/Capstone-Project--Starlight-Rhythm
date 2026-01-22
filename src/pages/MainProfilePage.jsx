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
  const [selectedSong, setSelectedSong] = useState(null);

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
  console.log(songs);
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
        className="bg-image"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundImage: `
      linear-gradient(90deg, rgba(145, 0, 58, 0.55), rgba(207, 71, 96, 0.55), rgba(255, 160, 160, 0.85)),
      url("src/images/test2.webp")
    `,

          backgroundPosition: "center",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background:
              "linear-gradient(90deg, #630030ff 20%, #b42779ff 40%, #972a4bff 60%, #ec4174ff 100%)",
            color: "white",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
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

          {/*  <div
            style={{ fontSize: "24px", fontWeight: "bold", color: "#1DB954" }}
          >
            <span style={{ fontSize: "28px" }}></span> Starlight Rhythm
          </div>
          */}

          <div style={{ flex: "0 1 500px", margin: "0 20px" }}>
            <input
              type="search"
              placeholder="Search for artists..."
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
                <span style={{ fontSize: "24px" }}>🎵</span> Starlight Rhythm
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

        <div
          style={{
            color: "#b3b3b3",
            paddingBottom: selectedSong ? "140px" : "0",
          }}
        >
          {isLoading ? (
            <div
              className="text-center"
              style={{
                fontSize: "100px",
                color: "#990000ff",
                fontWeight: "bold",
              }}
            >
              fetching tracks...
            </div>
          ) : (
            <Container>
              <Row className="mx-2 row row-cols-1">
                {!songs.length ? (
                  <div
                    className="text-center"
                    style={{
                      fontSize: "50px",
                      color: "#990000ff",
                      fontWeight: "bold",
                    }}
                  >
                    Type the search bar to find songs
                  </div>
                ) : (
                  <div
                    className="text-center"
                    style={{
                      fontSize: "50px",
                      color: "#990000ff",
                      fontWeight: "bold",
                    }}
                  >
                    Result
                  </div>
                )}
                {songs.map((song) => {
                  console.log(song);
                  return (
                    <div key={song.id}>
                      <div
                        className="my-1 d-flex align-items-center"
                        style={{
                          background:
                            "linear-gradient(180deg, #a80062ff 50%, #ff005181 100%)",
                          borderRadius: "8px",
                          padding: "12px",
                          transition: "transform 0.2s, background 0.2s",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedSong(song)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.02)";
                          e.currentTarget.style.background =
                            "linear-gradient(180deg, #a8006257 50%, #ff005141 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.background =
                            "linear-gradient(180deg, #a80062ff 50%, #ff005181 100%)";
                        }}
                      >
                        <Image
                          src={song.album.images[0].url}
                          rounded
                          className="me-2 me-md-3 flex-shrink-0"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: "500",
                              fontSize: "30px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {song.name}
                          </div>
                          <div
                            style={{
                              fontSize: "25px",
                              opacity: "0.8",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {song.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>

        {/* Music Player */}
        {selectedSong && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(180deg, #1a1a1a 0%, #444444ff 100%)",
              padding: "12px 16px",
              borderTop: "1px solid #333",
              zIndex: 1000,
            }}
          >
            {/* Mobile Layout */}
            <div className="d-md-none">
              {/* Song Info Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <Image
                  src={selectedSong.album.images[0].url}
                  rounded
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "12px",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: "18px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedSong.name}
                  </div>
                  <div
                    style={{
                      color: "#b3b3b3",
                      fontSize: "15px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedSong.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSong(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: "0 8px",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "3px",
                    background: "#404040",
                    borderRadius: "2px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      background: "#fff",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "4px",
                  }}
                >
                  <span style={{ color: "#b3b3b3", fontSize: "10px" }}>
                    0:00
                  </span>
                  <span style={{ color: "#b3b3b3", fontSize: "10px" }}>
                    {selectedSong.duration_ms
                      ? `${Math.floor(selectedSong.duration_ms / 60000)}:${String(Math.floor((selectedSong.duration_ms % 60000) / 1000)).padStart(2, "0")}`
                      : "3:45"}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    fontSize: "24px",
                  }}
                >
                  <i
                    className="bi bi-skip-backward me-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                </button>
                <button
                  style={{
                    background: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bi bi-play-fill"
                    style={{ fontSize: "20px" }}
                  ></i>
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    fontSize: "24px",
                  }}
                >
                  <i
                    className="bi bi-skip-forward ms-3"
                    style={{ fontSize: "20px" }}
                  ></i>
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div
              className="d-none d-md-flex"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {/* Left: Song Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: "0 0 30%",
                  minWidth: 0,
                }}
              >
                <Image
                  src={selectedSong.album.images[0].url}
                  rounded
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginRight: "16px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: "30px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedSong.name}
                  </div>
                  <div
                    style={{
                      color: "#b3b3b3",
                      fontSize: "20px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selectedSong.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                  </div>
                </div>
              </div>

              {/* Center: Controls */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "0 0 40%",
                }}
              >
                <div
                  style={{ display: "flex", gap: "16px", marginBottom: "8px" }}
                >
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#b3b3b3",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <i
                      className="bi bi-skip-backward me-3"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                  <button
                    style={{
                      background: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    <i
                      className="bi bi-play-fill"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#b3b3b3",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <i
                      className="bi bi-skip-forward ms-3"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: "#b3b3b3", fontSize: "12px" }}>
                    0:00
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "4px",
                      background: "#404040",
                      borderRadius: "2px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        height: "100%",
                        background: "#fff",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                  <span style={{ color: "#b3b3b3", fontSize: "12px" }}>
                    {selectedSong.duration_ms
                      ? `${Math.floor(selectedSong.duration_ms / 60000)}:${String(Math.floor((selectedSong.duration_ms % 60000) / 1000)).padStart(2, "0")}`
                      : "3:45"}
                  </span>
                </div>
              </div>

              {/* Right: Close button */}
              <div
                style={{
                  flex: "0 0 30%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setSelectedSong(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
