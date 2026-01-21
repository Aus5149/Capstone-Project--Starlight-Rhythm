import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { Container, Row,Col, Card, Image, Modal, Form, Button } from "react-bootstrap"
const Posts = () => {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
      const [file, setFile] = useState();
       const [imgUrl, setImgUrl] = useState()
   // const [authToken] = useLocalStorage("authToken", "")
   const [showCreateModal, setShowCreateModal] = useState(false);
   
  

   const navigate = useNavigate()
    const currentUser = useContext(AuthContext);
    console.log(posts)

//    function getUserId(){
 
//     const data = jwtDecode(authToken)       

//     return data.id
//    }


    const API_URL = "https://2024be56-7c75-4898-bba3-bb654ca8b38a-00-iglx0rrqz7e8.sisko.replit.dev"

    async function fetchPosts() {
        const userId = currentUser.uid
        const res = await fetch(`${API_URL}/playlist/user/${userId}`)
        const data = await res.json()
        console.log(data)
        setPosts(data)
    }

    async function createBook(){
        const userId = currentUser.uid
        const response = await fetch(`${API_URL}/playlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, user_id: userId})

        })
        console.log("Created")
        setTitle("")
        setDescription("")
        const data = await response.json()
        setPosts((prev) => [...prev, data])

        
    }

     async function DeleteBook(postId){
     const response = await fetch(`${API_URL}/playlist/${postId}`, {
            method: "DELETE",
            headers: {
                
                "Content-Type": "application/json"
            },

        })
       setPosts(posts.filter(post => post.id !== postId))
        console.log(`delete ${postId}`)
      
     }

     async function UpdateBook(postId){
        const newTitle = prompt("Do you want to edit the title of this post?")
      console.log(newTitle)
        const newDescription = prompt("Do you want to edit the content of this post?")
      console.log(newDescription)

      
        // a button that will change the specific post title and content
        const res = await fetch(`${API_URL}/playlist`, {
            method: "PUT",
            headers: {
              
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: newTitle, description: newDescription, post_id: postId})

        })
        const data = await res.json()
         setPosts(posts.map(post => post.id === postId ? data: post))
        console.log(res)
        //const data = await response.json()
        console.log(`Update ${postId}`)

     }



     
  useEffect(() =>{
    fetchPosts()
  }, [currentUser])
 
  


    return(
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
        onHide={() => setShowCreateModal(false)}
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
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={createBook}
          >
            create
          </Button>
        </Modal.Footer>
      </Modal>


<h2 style={{ marginBottom: '24px' }}>Explore Music</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))',
                gap: '24px'
              }}>
 {posts.map((song, index) => (
                  <div 
                    key={index}
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
                    <div  style={{
                      minHeight: '150px',
                      maxHeight: '200px',
                      minWidth: '90px',
                      
                      backgroundColor: '#404040',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '60px',
                      marginBottom: '16px'
                    }}>
                    <Image src={song.image || 'https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6'}
                    onError={(e) => e.target.src = "https://firebasestorage.googleapis.com/v0/b/sample-firebase-ai-app-fdc98.firebasestorage.app/o/posts%2FjknqVcFEmdMMIF16ikxPqNI7NC62%2FScreenshot%202025-11-13%20144125.png?alt=media&token=144819f4-91b4-40cf-9d97-09cbbb9ec2a6"}
                    style={{minHeight: '150px',
                      maxHeight: '200px',
                      minWidth: '90px',}}/>
                    </div>
                    <h5 style={{ color: '#999', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>{song.title}</h5>
                    <p style={{ color: '#999', fontSize: '14px', marginBottom: '4px' }}>{song.description}</p>
                    <button className="mx-2 bi bi-trash" style={{ width: 80}} onClick={()=>DeleteBook(song.id)}>
                Delete
            </button>
                  </div>
                
                ))}
 </div>


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
    )

}
        

    

export default Posts