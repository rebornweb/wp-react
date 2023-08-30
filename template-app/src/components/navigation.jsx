import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/navigation.css";

function Navigation() {
  const [pages, setPages] = useState([]);
  const apiurl = "http://tbnztest.rebornweb.co.nz/wp-json/wp/v2/pages";

  useEffect(() => {
    // Fetch pages from WordPress API
    fetch(apiurl)
      .then((response) => response.json())
      .then((data) => setPages(data))
      .catch((error) => console.error("Error fetching pages:", error));
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Your Brand
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {pages.map((page) => (
            <Nav.Link
              key={page.id}
              as={Link}
              to={`/pages/${page.id}`}
            >
              {page.title.rendered}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
