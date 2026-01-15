import React, { useState } from 'react';
import { Home, Search, Library, Heart, Music, Play, Pause, SkipForward, SkipBack, Volume2, User } from 'lucide-react';

export default function SpotifyMainMenu() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", cover: "🎵" },
    { id: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", cover: "🎵" },
    { id: 3, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", cover: "🎵" },
    { id: 4, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", cover: "🎵" },
    { id: 5, title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:58", cover: "🎵" },
    { id: 6, title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*ck Love 3", duration: "2:21", cover: "🎵" },
    { id: 7, title: "Peaches", artist: "Justin Bieber", album: "Justice", duration: "3:18", cover: "🎵" },
    { id: 8, title: "Montero", artist: "Lil Nas X", album: "Montero", duration: "2:17", cover: "🎵" },
  ];

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: '#000',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#1db954', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
            🎵 Musicfy
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'none',
            border: 'none',
            color: '#fff',
            padding: '8px 0',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <Home size={24} />
            Home
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'none',
            border: 'none',
            color: '#b3b3b3',
            padding: '8px 0',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <Search size={24} />
            Search
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'none',
            border: 'none',
            color: '#b3b3b3',
            padding: '8px 0',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <Library size={24} />
            Your Library
          </button>
        </nav>

        <div style={{ height: '1px', backgroundColor: '#282828', margin: '8px 0' }}></div>

        {/* Playlists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'none',
            border: 'none',
            color: '#b3b3b3',
            padding: '8px 0',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            <Heart size={20} />
            Liked Songs
          </button>
          <div style={{ color: '#b3b3b3', fontSize: '13px', paddingLeft: '8px' }}>
            <div style={{ padding: '8px 0', cursor: 'pointer' }}>My Playlist #1</div>
            <div style={{ padding: '8px 0', cursor: 'pointer' }}>Chill Vibes</div>
            <div style={{ padding: '8px 0', cursor: 'pointer' }}>Workout Mix</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        backgroundColor: '#121212',
        overflowY: 'auto',
        paddingBottom: '100px'
      }}>
        {/* Top Bar with Profile */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(18,18,18,1))',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: '#fff'
            }}>←</button>
            <button style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: '#fff'
            }}>→</button>
          </div>

          {/* Profile Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '4px',
            borderRadius: '23px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={16} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', paddingRight: '12px' }}>
              John Doe
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
            Good evening
          </h1>

          {/* Song List */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
              Popular Songs
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handlePlaySong(song)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 200px 60px',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    backgroundColor: currentSong?.id === song.id ? '#2a2a2a' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (currentSong?.id !== song.id) {
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentSong?.id !== song.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ color: '#b3b3b3', fontSize: '14px' }}>{index + 1}</span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#282828',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {song.cover}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '400', color: '#fff' }}>
                        {song.title}
                      </div>
                      <div style={{ fontSize: '14px', color: '#b3b3b3' }}>
                        {song.artist}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '14px', color: '#b3b3b3' }}>
                    {song.album}
                  </div>

                  <div style={{ fontSize: '14px', color: '#b3b3b3', textAlign: 'right' }}>
                    {song.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      {currentSong && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          backgroundColor: '#181818',
          borderTop: '1px solid #282828',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px'
        }}>
          {/* Currently Playing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '30%' }}>
            <div style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#282828',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              {currentSong.cover}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '400' }}>{currentSong.title}</div>
              <div style={{ fontSize: '12px', color: '#b3b3b3' }}>{currentSong.artist}</div>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#b3b3b3',
              cursor: 'pointer',
              marginLeft: '8px'
            }}>
              <Heart size={16} />
            </button>
          </div>

          {/* Playback Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '40%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#b3b3b3',
                cursor: 'pointer'
              }}>
                <SkipBack size={20} />
              </button>
              <button
                onClick={togglePlayPause}
                style={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={16} fill="#000" color="#000" /> : <Play size={16} fill="#000" color="#000" />}
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#b3b3b3',
                cursor: 'pointer'
              }}>
                <SkipForward size={20} />
              </button>
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#b3b3b3' }}>1:23</span>
              <div style={{ flex: 1, height: '4px', backgroundColor: '#404040', borderRadius: '2px' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#fff', borderRadius: '2px' }}></div>
              </div>
              <span style={{ fontSize: '11px', color: '#b3b3b3' }}>{currentSong.duration}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '30%', justifyContent: 'flex-end' }}>
            <Volume2 size={20} color="#b3b3b3" />
            <div style={{ width: '100px', height: '4px', backgroundColor: '#404040', borderRadius: '2px' }}>
              <div style={{ width: '70%', height: '100%', backgroundColor: '#fff', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

