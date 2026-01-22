import { useEffect, useState, useContext } from "react";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AuthContext } from "../context/authContext";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Modal,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [authToken] = useLocalStorage("authToken", "")
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatePlaylist, setUpdatePlaylist] = useState(null);
  const [showEditImageModal, setShowEditImageModal] = useState(false);

  // New state for managing dropdown
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId !== null) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdownId]);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  console.log(posts);

  //    function getUserId(){

  //     const data = jwtDecode(authToken)

  //     return data.id
  //    }

  const API_URL =
    "https://2024be56-7c75-4898-bba3-bb654ca8b38a-00-iglx0rrqz7e8.sisko.replit.dev";

  async function fetchPosts() {
    const userId = currentUser.uid;
    const res = await fetch(`${API_URL}/playlist/user/${userId}`);
    const data = await res.json();
    console.log(data);
    setPosts(data);
  }

  async function createBook() {
    setLoading(true);
    // 1. We want to define where are we saving?
    // Reference Point to the storage
    const savePoint = ref(storage, `posts/${currentUser.uid}/${file.name}`);
    // 2. Upload the file to the point we want to save.
    const response1 = await uploadBytes(savePoint, file);
    // 3. Get the download url after uploading
    const imageUrl = await getDownloadURL(response1.ref);

    const userId = currentUser.uid;
    const response = await fetch(`${API_URL}/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        image: imageUrl,
        user_id: userId,
      }),
    });
    setShowCreateModal(false);
    console.log("Created");
    setTitle("");
    setDescription("");
    setFile(null);
    const data = await response.json();
    setPosts((prev) => [...prev, data]);
    setLoading(false);
  }

  async function DeleteBook(postId) {
    const response = await fetch(`${API_URL}/playlist/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts(posts.filter((post) => post.id !== postId));
    console.log(`delete ${postId}`);
  }

  async function UpdateBook(postId) {
    setLoading(true);
    // a button that will change the specific post title and content
    const res = await fetch(`${API_URL}/playlist`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        post_id: postId.id,
      }),
    });
    setShowEditModal(false);
    console.log(title);
    console.log(description);
    console.log(postId.id);
    const data = await res.json();
    setPosts(posts.map((post) => (post.id === postId.id ? data : post)));
    console.log(res);
    //const data = await response.json()
    console.log(`Update ${postId}`);
    setLoading(false);
  }

  async function UpdateImage(postId) {
    setLoading(true);
    // 1. We want to define where are we saving?
    // Reference Point to the storage
    const savePoint = ref(storage, `posts/${currentUser.uid}/${file.name}`);
    // 2. Upload the file to the point we want to save.
    const response1 = await uploadBytes(savePoint, file);
    // 3. Get the download url after uploading
    const imageUrl = await getDownloadURL(response1.ref);
    // a button that will change the specific post title and content
    const res = await fetch(`${API_URL}/playlistImage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageUrl,
        post_id: postId.id,
      }),
    });
    console.log(imageUrl);
    console.log(postId.id);
    const data = await res.json();
    setPosts(posts.map((post) => (post.id === postId.id ? data : post)));
    console.log(res);
    setTitle("");
    setDescription("");
    setShowEditImageModal(false);
    //const data = await response.json()
    console.log(`Update image ${postId}`);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!currentUser) {
        navigate("/login");
      }
    }, 1000);
    return clearTimeout(timeout);
  }, [currentUser]);

  return (
    <>
      <div className="d-flex align-items-center gap-3 py-2">
        <h3 className="mb-0">Your Playlists</h3>
        <Button
          className="rounded-pill"
          variant="outline-light"
          size="sm"
          onClick={() => setShowCreateModal(true)}
        >
          + Create
        </Button>
      </div>
      {/*
        <div className="d-flex flex-column align-items-center my-5" style={{backgroundColor: "papayawhip"}} >
         <h1 className="my-5" style={{fontSize:50, fontFamily: "fantasy"}}>Book your tables!</h1>
         <br/>
         <h4 className="my-1" style={{fontSize:20, fontFamily: "system-ui"}}>Title</h4>
         <input name="title" 
            className="my-3"
            value={title}
             placeholder="Title"
            style={{width:300, blockSize: 30}}
            onChange={(e) => setTitle(e.target.value)}
            
            />
            <br/>
            <h4 className="my-1" style={{fontSize:20, fontFamily: "system-ui"}}>Content</h4>
          <input name="content" 
            className="my-3"
            value={description}
            style={{width:300, blockSize: 30}}
            placeholder="Content"
            onChange={(e) => setDescription(e.target.value)}
            />
            
             <br/>
            <button className="px-3 py-3 my-5" onClick={createBook}>
                Create Book
            </button>
         
       </div>
 */}
      {/* Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => {
          setShowCreateModal(false);
          setTitle("");
          setDescription("");
          setFile();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="playlistName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter playlist name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={16}
              />
            </Form.Group>

            <Form.Group controlId="playlistDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="playlistDescription" className="mt-3">
              <Form.Label>Playlist Icon</Form.Label>
              <Form.Control
                type="file"
                rows={3}
                placeholder="Optional"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createBook} disabled={isLoading}>
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setTitle("");
          setDescription("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="playlistName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                maxLength={16}
                type="text"
                placeholder="Enter playlist name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="playlistDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => UpdateBook(updatePlaylist)}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* image update */}
      <Modal
        show={showEditImageModal}
        onHide={() => setShowEditImageModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="playlistDescription" className="mt-3">
              <Form.Label>Playlist Icon</Form.Label>
              <Form.Control
                type="file"
                rows={3}
                placeholder="Optional"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditImageModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => UpdateImage(updatePlaylist)}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 style={{ marginBottom: "24px" }}>Explore Music</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))",
          gap: "24px",
        }}
      >
        {posts.map((song, index) => (
          <div
            key={song.id || index} // Use song.id if available
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "16px",
              cursor: "pointer",
              transition: "transform 0.2s, background-color 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.backgroundColor = "#333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#282828";
            }}
          >
            {/* Three Dots Dropdown Menu - Bootstrap Version */}
            <Dropdown
              show={openDropdownId === (song.id || index)}
              onToggle={(isOpen) => {
                setOpenDropdownId(isOpen ? song.id || index : null);
              }}
              drop="down"
              align="end"
            >
              <Dropdown.Toggle
                as="button"
                className="dropdown-toggle-custom"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  zIndex: 10,
                  color: "#b3b3b3",
                  padding: "6px 10px",
                  fontSize: "20px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  backgroundColor: "#282828",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  minWidth: "180px",
                  padding: "8px 0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                {/* Update Image */}
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    setUpdatePlaylist(song);
                    setFile(song.image);
                    setShowEditImageModal(true);
                    setOpenDropdownId(null);
                  }}
                  style={{
                    color: "#fff",
                    padding: "10px 16px",
                    fontSize: "14px",
                  }}
                  className="dropdown-item-custom"
                >
                  <i className="bi bi-image me-2"></i>
                  Update Image
                </Dropdown.Item>

                {/* Update */}
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    setDescription(song.description);
                    setTitle(song.title);
                    setUpdatePlaylist(song);
                    setShowEditModal(true);
                    setOpenDropdownId(null);
                  }}
                  style={{
                    color: "#fff",
                    padding: "10px 16px",
                    fontSize: "14px",
                  }}
                  className="dropdown-item-custom"
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Update
                </Dropdown.Item>

                <Dropdown.Divider
                  style={{ borderColor: "#404040", margin: "8px 0" }}
                />

                {/* Delete */}
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteBook(song.id);
                    setOpenDropdownId(null);
                  }}
                  style={{
                    color: "#ff4444",
                    padding: "10px 16px",
                    fontSize: "14px",
                  }}
                  className="dropdown-item-custom"
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Album Image */}
            <div
              style={{
                minHeight: "150px",
                maxHeight: "200px",
                minWidth: "90px",
                backgroundColor: "#404040",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "60px",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <Image
                src={
                  song.image ||
                  "https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6"
                }
                onError={(e) =>
                  (e.target.src =
                    "https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6")
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Song Title */}
            <h5
              style={{
                color: "#fff",
                marginBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {song.title}
            </h5>
          </div>
        ))}
      </div>

      {/* Custom CSS for dropdown hover effects */}
      <style>{`
        .dropdown-toggle-custom::after {
          display: none !important;
        }
        
        .dropdown-toggle-custom:hover {
          background-color: rgba(0,0,0,0.8) !important;
        }

        .dropdown-item-custom:hover {
          background-color: #404040 !important;
        }

        .dropdown-item-custom:focus {
          background-color: #404040 !important;
        }

        .dropdown-item-custom:active {
          background-color: #404040 !important;
        }
      `}</style>

      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />

      {/*<h2 style={{ marginBottom: "24px" }}>Explore Music</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))",
          gap: "24px",
        }}
      >
        {posts.map((song, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#282828",
              borderRadius: "8px",
              padding: "16px",
              cursor: "pointer",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.backgroundColor = "#333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#282828";
            }}
          >
            <div
              style={{
                minHeight: "150px",
                maxHeight: "200px",
                minWidth: "90px",

                backgroundColor: "#404040",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "60px",
                marginBottom: "16px",
              }}
            >
              <Image
                src={
                  song.image ||
                  "https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6"
                }
                onError={(e) =>
                  (e.target.src =
                    "https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6")
                }
                style={{
                  minHeight: "150px",
                  maxHeight: "200px",
                  minWidth: "90px",
                }}
              />
            </div>
            <h5
              style={{
                color: "#999",
                marginBottom: "8px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {song.title}
            </h5>


            <button
              className="mx-2"
              onClick={() => {
                setUpdatePlaylist(song);
                setFile(song.image);
                setShowEditImageModal(true);
              }}
            >
              <i className="bi bi-pencil-square" style={{ width: 50 }}>
                Update Image
              </i>
            </button>

            <button
              className="mx-2"
              onClick={() => {
                setDescription(song.description);
                setTitle(song.title);
                setUpdatePlaylist(song);
                setShowEditModal(true);
              }}
            >
              <i className="bi bi-pencil-square" style={{ width: 50 }}>
                Update
              </i>
            </button>
            <button
              className="mx-2 bi bi-trash"
              style={{ width: 80 }}
              onClick={() => DeleteBook(song.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
*/}

      {/*description */}
      {/*<p style={{ color: "#999", fontSize: "14px", marginBottom: "4px" }}>
              {song.description}
            </p>*/}
      {/*  <div className="">
    
{posts.length > 0 ? (
    posts.map((post,index) => (
        <Col md={6} key={index} className="flex-column align-items-center" style={{left: "50%", transform: "translateX(50%)"}}>
            <Card className="my-3 mx-4 ">
                <Image src={post.imgUrl} rounded className="me-3-shrink-0" style={{width: "100px", height: "100px", objectFit: "cover"}}/>
                <Card.Header style={{fontStyle: "-moz-initial", fontSize:25, backgroundColor: "lightcoral"}}>Table booked! See you soon...</Card.Header>
                <Card.Body style={{backgroundColor: "lightgoldenrodyellow"}}>
                    <Card.Title>Title: {post.title}</Card.Title>
                    <br/>
                    <Card.Subtitle>Content: {post.description}</Card.Subtitle>
                      <button className="mx-2" onClick={()=>UpdateBook(post.id)}>
                <i className="bi bi-pencil-square" style={{ width: 50}}>Update</i>
            </button>
            <button className="mx-2 bi bi-trash" style={{ width: 80}} onClick={()=>DeleteBook(post.id)}>
                Delete
            </button>
                </Card.Body>
            </Card>
           
            </Col>
             
    ))
) : (
    <Container className="my-5" style={{backgroundColor: "gray"}}>
        <Col className="d-flex flex-column align-items-center">
        <h3 className="my-5"> WOAH! You haven't book a table with us.</h3>
     
      
        </Col>
    
    </Container>
)}
</div>
*/}
    </>
  );
};

export default Posts;
