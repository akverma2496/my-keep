import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import ThemeToggle from "./ThemeToggle";
import ConfirmModal from "../components/modals/ConfirmModal";

const AppNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const handleNavItemClick = () => setIsOpen(false);

  const username = user?.email ? user.email.split("@")[0] : "";

  // When user confirms logout
  const confirmLogout = () => {
    dispatch(logout());
    setShowConfirm(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="md" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/categories">
            🗒️ My Keep
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {isAuthenticated && (
                <span className="fw-semibold text-muted">
                  👋 Hello, {username}
                </span>
              )}

              <ThemeToggle />

              {isAuthenticated ? (
                <Nav.Link
                  className="text-danger"
                  onClick={() => {
                    setShowConfirm(true); // show modal on click
                    handleNavItemClick();
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" onClick={handleNavItemClick}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" onClick={handleNavItemClick}>
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
};

export default AppNavbar;