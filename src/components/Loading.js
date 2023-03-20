import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100"> 
    <Spinner animation="border" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}
