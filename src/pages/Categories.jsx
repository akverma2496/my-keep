import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Card,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../redux/actions/categoryActions";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && user?.localId) {
      dispatch(fetchCategories(token, user.localId));
    }
  }, [dispatch, token, user]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(createCategory(token, user.localId, categoryName));
      setCategoryName("");
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(token, user.localId, id));
    }
  };

  // ✅ Handle click on category card → go to /categories/:id
  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Categories</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Category</Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : categories.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {categories.map((cat) => (
            <Col key={cat.id}>
              <Card
                className="shadow-sm p-3 h-100 hover-card"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{cat.name}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      handleDelete(cat.id);
                    }}
                  >
                    🗑
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No categories yet.</p>
      )}

      {/* Add Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCategory}>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* 💅 Small hover effect for polish */}
      <style>{`
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default Categories;
