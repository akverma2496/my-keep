// src/pages/Categories.jsx
import { useEffect, useState } from "react";
import { Button, Modal, Form, Card, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory, deleteCategory } from "../redux/actions/categoryActions";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.idToken && user?.localId) {
      dispatch(fetchCategories(user.idToken, user.localId));
    }
  }, [dispatch, user]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      dispatch(createCategory(user.idToken, user.localId, categoryName));
      setCategoryName("");
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(user.idToken, user.localId, id));
    }
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
              <Card className="shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>{cat.name}</span>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(cat.id)}>
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
