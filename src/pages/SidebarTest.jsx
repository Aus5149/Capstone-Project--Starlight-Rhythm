import React, { useState } from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarWithSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Your logout logic here
    console.log('Logging out...');
  };

  const search = () => {
    // Your search logic here
    console.log('Searching for:', searchQuery);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClose = () => setIsSidebarOpen(false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: "100vh", backgroundColor: '#121212' }}>
        {/* Navbar */}
        <nav style={{
          backgroundColor: '#000',
          color: 'white',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 100
        }}>
          {/* Menu Button */}
          <Button
            variant="link"
            onClick={toggleSidebar}
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px',
              marginRight: '12px'
            }}
            aria-label="Toggle menu"
          >
            <i className="bi bi-list" style={{ fontSize: '28px' }}></i>
          </Button>

          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1DB954', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '28px' }}>🎵</span>
            <span style={{ marginLeft: '8px' }}>Spotify</span>
          </div>

          <div style={{ flex: '0 1 500px', margin: '0 20px' }} className="d-none d-md-block">
            <input
              type="search"
              placeholder="Search for songs, artists, albums..."
              value={searchQuery}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  search();
                }
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                borderRadius: '20px',
                border: '1px solid #333',
                backgroundColor: '#282828',
                color: 'white'
              }}
            />
          </div>

          <div className="d-flex align-items-center gap-3">
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
            <Button
              onClick={handleLogout}
              variant="outline-light"
              className="rounded-pill d-none d-md-inline-block"
              size="sm"
            >
              Log Out
            </Button>
          </div>
        </nav>

        {/* Bootstrap Offcanvas Sidebar */}
        <Offcanvas 
          show={isSidebarOpen} 
          onHide={handleClose}
          placement="start"
          style={{
            backgroundColor: '#000',
            color: 'white'
          }}
        >
          <Offcanvas.Header 
            closeButton 
            closeVariant="white"
            style={{ borderBottom: '1px solid #282828' }}
          >
            <Offcanvas.Title style={{ color: '#1DB954', fontWeight: 'bold' }}>
              <span style={{ fontSize: '24px' }}>🎵</span> Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column">
              {/* Explore */}
              <Nav.Link
                onClick={() => {
                  console.log('Navigate to Explore');
                  handleClose();
                }}
                className="text-white px-4 py-3"
                style={{
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#282828'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-compass me-3" style={{ fontSize: '20px' }}></i>
                Explore
              </Nav.Link>

              {/* Library */}
              <Nav.Link
                onClick={() => {
                  console.log('Navigate to Library');
                  handleClose();
                }}
                className="text-white px-4 py-3"
                style={{
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#282828'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-collection me-3" style={{ fontSize: '20px' }}></i>
                Library
              </Nav.Link>

              <hr className="mx-4 my-3" style={{ borderColor: '#282828' }} />

              {/* Log Out */}
              <Nav.Link
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
                className="px-4 py-3"
                style={{
                  fontSize: '16px',
                  color: '#ff4444',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#282828'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-box-arrow-right me-3" style={{ fontSize: '20px' }}></i>
                Log Out
              </Nav.Link>
            </Nav>

            {/* Footer */}
            <div 
              className="mt-auto px-4 py-3"
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #282828',
                fontSize: '12px',
                color: '#b3b3b3'
              }}
            >
              <p className="mb-0">© 2024 Spotify Clone</p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{ color: 'white' }}>Your Content Here</h1>
          <p style={{ color: '#b3b3b3' }}>Click the menu button to open the sidebar</p>
        </div>
      </div>

      {/* Add Bootstrap Icons CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />
    </>
  );
};

export default NavbarWithSidebar;