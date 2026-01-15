import { Nav } from "react-bootstrap";

export default function MainMenuPage() {
  return (
    <div className="d-flex flex-column" style={{height: "100vh", overflow: "hidden"}}>
        <div style={{flexShrink: 0}}>
            <Nav className="py-3 shadow-sm sticky-top navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="w-100 alighn-items-center row">
                        <div className="text-start col-md-4 col-6">
                        <span className="ps-3 navbar-brand">
                            main menu
                        </span>
                    </div>
                    </div>
                </div>
            </Nav>
        </div>
    </div>
  )
}