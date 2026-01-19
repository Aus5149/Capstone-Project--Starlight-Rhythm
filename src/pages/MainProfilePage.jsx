
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, InputGroup, FormControl, Button, Row, Card, CardBody } from "react-bootstrap";

const CLIENT_ID = "ee89ebc6c60b482889ad000b20b14608"
const CLIENT_SECRET = "3cfd4e2e837d4b07b610e2865f1d3099"

const ProfilePage = () => {
   
    const [searchQuery, setSearchQuery] = useState('');
    const [accessToken, setAccessToken] = useState(''); 
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // API access token
         var authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
         }

        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => {
           setAccessToken(data.access_token);
        })
        .catch(error => console.error('Error fetching access token:', error));  

    }, []);

    async function search() {
        console.log("Searching for " + searchQuery);

     var searchParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }

    }

    var artistID = await fetch("https://api.spotify.com/v1/search?q=" + searchQuery + '&type=artist', searchParameters)

    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})

    console.log("Artist ID is " + artistID);

    var songs = await fetch("https://api.spotify.com/v1/artists/" + artistID + "/top-tracks" + '?include_groups=album&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {console.log(data); setSongs(data.tracks);})


    }
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut()
        navigate("/login");
    }

    return(
        <>
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
            onKeyDown={event => {
                if (event.key == "Enter"){
                    search();
                }
            }}
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


 {/* Web */}

      <Container>
        <Row className="mx-2 row row-cols-6">
            {songs.map((songs) => {
                console.log(songs);
                return (
   <Card>
        <Card.Img src={songs.album.images[0].url}/>
        <Card.Body>
          <Card.Title>{songs.name}</Card.Title>
          </Card.Body>
       </Card>
                )
            })}
        </Row>
      </Container>
      </div>

      





        </>
    )
}


export default ProfilePage;