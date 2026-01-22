import React, { useState } from "react";

export default function PlaylistDropdownDemo() {
  const [playlists] = useState([
    {
      id: 1,
      title: "Chill Vibes",
      description: "50 songs",
      image: "🎵",
      songs: 50,
    },
    {
      id: 2,
      title: "Workout Mix",
      description: "30 songs",
      image: "💪",
      songs: 30,
    },
    {
      id: 3,
      title: "Focus Mode",
      description: "40 songs",
      image: "🎧",
      songs: 40,
    },
    {
      id: 4,
      title: "Party Hits",
      description: "60 songs",
      image: "🎉",
      songs: 60,
    },
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleEdit = (playlist) => {
    alert(`Editing playlist: ${playlist.title}`);
    setActiveDropdown(null);
  };

  const handleShare = (playlist) => {
    alert(`Sharing playlist: ${playlist.title}`);
    setActiveDropdown(null);
  };

  const handleDelete = (playlist) => {
    if (window.confirm(`Delete "${playlist.title}"?`)) {
      alert(`Deleted: ${playlist.title}`);
      setActiveDropdown(null);
    }
  };

  const handleAddToQueue = (playlist) => {
    alert(`Added "${playlist.title}" to queue`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (playlistId) => {
    setActiveDropdown(activeDropdown === playlistId ? null : playlistId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "40px",
        color: "white",
      }}
    >
      <h1
        style={{ marginBottom: "32px", fontSize: "32px", fontWeight: "bold" }}
      >
        My Playlists
      </h1>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "24px",
        }}
      >
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              padding: "16px",
              transition: "background-color 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#282828")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#181818")
            }
          >
            {/* Three Dots Dropdown */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 10,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(playlist.id);
                }}
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  opacity: 0.8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.8")}
              >
                ⋮
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === playlist.id && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 998,
                    }}
                  />

                  {/* Dropdown Content */}
                  <div
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: "0",
                      backgroundColor: "#282828",
                      borderRadius: "8px",
                      minWidth: "200px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                      zIndex: 999,
                      overflow: "hidden",
                      animation: "fadeIn 0.15s ease-out",
                    }}
                  >
                    {/* Edit */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(playlist);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#3e3e3e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      ✏️ Edit Playlist
                    </button>

                    {/* Add to Queue */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToQueue(playlist);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#3e3e3e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      ➕ Add to Queue
                    </button>

                    {/* Share */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(playlist);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#3e3e3e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      🔗 Share
                    </button>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#404040",
                        margin: "4px 0",
                      }}
                    />

                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(playlist);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#ff4444",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "14px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#3e3e3e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      🗑️ Delete Playlist
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Playlist Cover */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                backgroundColor: "#282828",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "64px",
                marginBottom: "16px",
              }}
            >
              {playlist.image}
            </div>

            {/* Playlist Info */}
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "4px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {playlist.title}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#b3b3b3",
                margin: 0,
              }}
            >
              {playlist.description}
            </p>
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
