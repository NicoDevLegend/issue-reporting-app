import { Container, Row, Col, Form } from "react-bootstrap";

export default function TargetUsersBadge({ options, title }) {
    return (
        <div
          className="p-4 w-75 mx-auto mt-1 mb-4 bg-dark text-light rounded d-flex justify-content-center align-items-center"
          style={{
            maxWidth: "800px",
            minHeight: "100px",
            boxShadow: "0px 5px 10px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label><strong>{title}</strong></Form.Label>
                  <Form.Select aria-label="Default select example">
                      {options}
                  </Form.Select>
                </Form.Group>
              </Col>
              {/*SEARCH BAR*/}
              <Col></Col>
            </Row>
          </Container>
        </div>
    )
}