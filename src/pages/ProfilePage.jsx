import React, { useState } from 'react';

const SpotifyProfile = () => {
  const [activeSection, setActiveSection] = useState('explore');
  const [playlists, setPlaylists] = useState([
    'My Playlist #1',
    'Favorites',
    'Chill Vibes'
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const musicData = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', image: '🎵' },
    { id: 2, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', image: '🎵' },
    { id: 3, title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', image: '🎵' },
    { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', image: '🎵' },
    { id: 5, title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'Stay', image: '🎵' },
    { id: 6, title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', image: '🎵' },
  ];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, newPlaylistName]);
      setNewPlaylistName('');
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#121212' }}>
      {/* Navbar */}
      <nav style={{ 
        backgroundColor: '#000', 
        color: 'white', 
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1DB954' }}>
          <span style={{ fontSize: '28px' }}>🎵</span> Spotify
        </div>
        
        <div style={{ flex: '0 1 500px', margin: '0 20px' }}>
          <input
            type="search"
            placeholder="Search for songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '20px',
              border: '1px solid #333',
              backgroundColor: '#282828',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '20px'
          }}>
            👤
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#000',
          color: 'white',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div 
            onClick={() => setActiveSection('explore')}
            style={{
              padding: '12px 16px',
              marginBottom: '8px',
              borderRadius: '6px',
              backgroundColor: activeSection === 'explore' ? '#282828' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <span style={{ marginRight: '12px' }}>🔍</span> Explore
          </div>
          
          <div 
            onClick={() => setActiveSection('library')}
            style={{
              padding: '12px 16px',
              marginBottom: '24px',
              borderRadius: '6px',
              backgroundColor: activeSection === 'library' ? '#282828' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <span style={{ marginRight: '12px' }}>📚</span> Your Library
          </div>

          {activeSection === 'library' && (
            <div>
              <button 
                onClick={() => setShowModal(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#1DB954',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                <span style={{ marginRight: '8px' }}>➕</span> Create Playlist
              </button>

              <hr style={{ borderColor: '#333', margin: '20px 0' }} />

              <h6 style={{ color: '#999', marginBottom: '16px', fontSize: '14px' }}>Your Playlists</h6>
              {playlists.map((playlist, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '10px 12px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#282828'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ marginRight: '8px' }}>🎶</span> {playlist}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          backgroundColor: '#181818',
          color: 'white',
          padding: '24px',
          overflowY: 'auto'
        }}>
          {activeSection === 'explore' ? (
            <>
              <h2 style={{ marginBottom: '24px' }}>Explore Music</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                {musicData.map((song) => (
                  <div 
                    key={song.id}
                    style={{
                      backgroundColor: '#282828',
                      borderRadius: '8px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.backgroundColor = '#333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = '#282828';
                    }}
                  >
                    <div style={{
                      height: '150px',
                      backgroundColor: '#404040',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '60px',
                      marginBottom: '16px'
                    }}>
                      {song.image}
                    </div>
                    <h5 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>{song.title}</h5>
                    <p style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>{song.artist}</p>
                    <p style={{ color: '#999', fontSize: '12px', marginBottom: '12px' }}>{song.album}</p>
                    <button style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: '#1DB954',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      ▶ Play
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: '24px' }}>Your Library</h2>
              {playlists.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '24px'
                }}>
                  {playlists.map((playlist, index) => (
                    <div 
                      key={index}
                      style={{
                        backgroundColor: '#282828',
                        borderRadius: '8px',
                        padding: '16px'
                      }}
                    >
                      <div style={{
                        height: '150px',
                        backgroundColor: '#404040',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '60px',
                        marginBottom: '16px'
                      }}>
                        🎶
                      </div>
                      <h5 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>{playlist}</h5>
                      <p style={{ color: '#999', fontSize: '14px', marginBottom: '12px' }}>0 songs</p>
                      <button style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '20px',
                        border: '1px solid #1DB954',
                        backgroundColor: 'transparent',
                        color: '#1DB954',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}>
                        Open Playlist
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#999', marginTop: '60px' }}>
                  <h4>No playlists yet</h4>
                  <p>Create your first playlist to get started!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#282828',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Create New Playlist</h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Playlist Name</label>
              <input
                type="text"
                placeholder="Enter playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#181818',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '20px',
                  border: '1px solid #666',
                  backgroundColor: 'transparent',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePlaylist}
                disabled={!newPlaylistName.trim()}
                style={{
                  padding: '10px 24px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: newPlaylistName.trim() ? '#1DB954' : '#444',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: newPlaylistName.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyProfile;