import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
  const parallaxStyle = {
    backgroundImage: "url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={parallaxStyle} className="mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <div className="animated-texts bounceIn">
          <h1>
            Experience the Best Beauty Services at <span style={{ color: '#c09f80' }}>Glamour Salon</span>
          </h1>
          <h3>We offer the best services for all your beauty needs.</h3>
        </div>
      </Container>
    </div>
  );
}

export default Parallax;
