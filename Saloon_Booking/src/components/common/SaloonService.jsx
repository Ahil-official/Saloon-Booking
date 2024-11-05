import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header"; // Ensure this path is correct
import {
  FaCut,
  FaSpa,
  FaHandSparkles,
  FaBath,
  FaTint,
  FaFan,
  FaChair,
  FaClock
} from "react-icons/fa";

const SaloonService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title={"Our Services"} />
        <Row className="mt-4">
          <h4 className="text-center">
            Services at <span style={{ color: '#c09f80' }}>Glamour Salon - </span>Beauty & Wellness
            <span style={{ marginLeft: '10px' }}>
              <FaClock /> Open Daily
            </span>
          </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaCut /> Haircuts
                </Card.Title>
                <Card.Text>Get the perfect haircut tailored to your style.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaSpa /> Massages
                </Card.Title>
                <Card.Text>Relax and rejuvenate with our professional massages.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaHandSparkles /> Manicures & Pedicures
                </Card.Title>
                <Card.Text>Pamper yourself with our manicure and pedicure services.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaBath /> Facials
                </Card.Title>
                <Card.Text>Experience luxurious facials for radiant skin.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaTint /> Hair Coloring
                </Card.Title>
                <Card.Text>Update your look with our expert hair coloring services.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaFan /> Hair Treatments
                </Card.Title>
                <Card.Text>Nourish your hair with our specialized treatments.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#c09f80' }}>
                  <FaChair /> Styling
                </Card.Title>
                <Card.Text>Get ready for any occasion with our styling services.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <hr />
    </>
  );
};

export default SaloonService;
