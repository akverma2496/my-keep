import { useState, useRef, useEffect } from "react";
import { Navbar, Container, Nav, Form, InputGroup, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import ConfirmModal from "../components/modals/ConfirmModal";
import ThemeToggle from "./ThemeToggle";
import { MdLogout, MdArchive, MdPersonAdd, MdStickyNote2, MdSearch, MdMoreVert } from "react-icons/md";
import { setSearchQuery } from "../redux/slices/searchSlice";

const AppNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const searchQuery = useSelector((state) => state.search.query);

  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const handleNavItemClick = () => setIsOpen(false);
  const username = user?.email ? user.email.split("@")[0] : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const confirmLogout = () => {
    dispatch(logout());
    setShowConfirm(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(e.target.value))
  };

  return (
    <>
      <Navbar
        bg={theme === "dark" ? "dark" : "light"}
        variant={theme === "dark" ? "dark" : "light"}
        expand="md"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/categories" className="d-flex align-items-center gap-2">
            <MdStickyNote2 size={24} />
            <span className="fw-semibold">My Keep</span>
          </Navbar.Brand>

          {/* Search Bar - visible on medium+ screens */}
          {isAuthenticated && (
            <Form
              onSubmit={handleSearch}
              className="d-none d-md-flex flex-grow-1 mx-4"
              style={{ maxWidth: "500px" }}
            >
              <InputGroup>
                <InputGroup.Text className="bg-body border-end-0">
                  <MdSearch size={20} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search in my keep"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="border-start-0 bg-body"
                  style={{
                    boxShadow: "none",
                  }}
                />
              </InputGroup>
            </Form>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />

          <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {/* Search Bar for mobile */}
              {isAuthenticated && (
                <Form
                  onSubmit={handleSearch}
                  className="d-md-none w-100 mb-2"
                >
                  <InputGroup>
                    <InputGroup.Text className="bg-body border-end-0">
                      <MdSearch size={20} className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      placeholder="Search in my keep"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-start-0 bg-body"
                    />
                  </InputGroup>
                </Form>
              )}

              {isAuthenticated ? (
                <>
                  {/* Username */}
                  <span className="text-muted">
                    👋 Hello, <span className="fw-medium text-body">{username}</span>
                  </span>

                  {/* More Options Dropdown */}
                  <div className="position-relative" ref={dropdownRef}>
                    <Dropdown show={showDropdown} align="end">
                      <Dropdown.Toggle
                        as="button"
                        bsPrefix="custom-dropdown"
                        className="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        <MdMoreVert size={22} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ minWidth: "200px" }}>

                        <Dropdown.Item
                          as={Link}
                          to="/archive"
                          className="d-flex align-items-center gap-2 py-2"
                          onClick={() => {
                            setShowDropdown(false);
                            handleNavItemClick();
                          }}
                        >
                          <MdArchive size={20} />
                          <span>Archive</span>
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item className="d-flex align-items-center gap-2 py-2">
                          <ThemeToggle />
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item
                          onClick={() => {
                            setShowConfirm(true);
                            setShowDropdown(false);
                            handleNavItemClick();
                          }}
                          className="d-flex align-items-center gap-2 text-danger py-2"
                        >
                          <MdLogout size={20} />
                          <span>Logout</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <>
                  {/* <Nav.Link
                    as={Link}
                    to="/login"
                    className="d-flex align-items-center gap-1"
                    onClick={handleNavItemClick}
                  >
                    <MdLogin size={20} />
                    <span>Login</span>
                  </Nav.Link> */}
                  <Nav.Link
                    as={Link}
                    to="/signup"
                    className="d-flex align-items-center gap-1"
                    onClick={handleNavItemClick}
                  >
                    <MdPersonAdd size={20} />
                    <span>Signup</span>
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