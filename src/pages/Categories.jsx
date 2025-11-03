import { useEffect, useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  editCategory,
} from "../redux/actions/categoryActions";
import CategoryCard from "../components/cards/CategoryCard";
import AddCategoryModal from "../components/modals/AddCategoryModal";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && user?.localId) dispatch(fetchCategories(token, user.localId));
  }, [dispatch, token, user]);

  const handleAddOrEditCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (isEdit) {
      dispatch(editCategory(token, user.localId, editCategoryId, categoryName));
    } else {
      dispatch(createCategory(token, user.localId, categoryName));
    }

    setCategoryName("");
    setShowModal(false);
    setIsEdit(false);
    setEditCategoryId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?"))
      dispatch(deleteCategory(token, user.localId, id));
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.name);
    setEditCategoryId(cat.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleCategoryClick = (id) => navigate(`/categories/${id}`);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Categories</h3>
        <Button onClick={() => setShowModal(true)}>+ Add Category</Button>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : categories.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {categories.map((cat) => (
            <Col key={cat.id}>
              <CategoryCard
                category={cat}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onClick={() => handleCategoryClick(cat.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No categories yet.</p>
      )}

      <AddCategoryModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setCategoryName("");
        }}
        onSubmit={handleAddOrEditCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        isEdit={isEdit}
      />
    </div>
  );
};

export default Categories;