import { useEffect, useState } from "react";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  editCategory,
} from "../redux/actions/categoryActions";
import CategoryCard from "../components/cards/CategoryCard";
import AddCategoryModal from "../components/modals/AddCategoryModal";
import ConfirmModal from "../components/modals/ConfirmModal";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);
  const { user, token } = useSelector((state) => state.auth);

  // ⬇️ NEW: read global search query
  const searchQuery = useSelector((state) => state.search.query);

  // ⬇️ NEW: filter categories using search
  const filteredCategories = categories.filter(
  (cat) =>
    cat?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
);

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
    resetForm();
  };

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(token, user.localId, categoryToDelete));
      setCategoryToDelete(null);
      setShowConfirm(false);
    }
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.name);
    setEditCategoryId(cat.id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleCategoryClick = (id) => navigate(`/categories/${id}`);

  const resetForm = () => {
    setCategoryName("");
    setShowModal(false);
    setIsEdit(false);
    setEditCategoryId(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Categories</h3>

        <button
          onClick={() => setShowModal(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="btn btn-secondary d-flex align-items-center gap-2 border-0"
          style={{
            borderRadius: "50px",
            padding: "10px",
            transition: "all 0.3s ease",
            width: isHovered ? "auto" : "44px",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <MdAdd size={24} style={{ flexShrink: 0 }} />
          <span
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              paddingRight: isHovered ? "12px" : "0",
            }}
          >
            Add Category
          </span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filteredCategories.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filteredCategories.map((cat) => (
            <Col key={cat.id}>
              <CategoryCard
                category={cat}
                onDelete={() => handleDeleteClick(cat.id)}
                onEdit={handleEdit}
                onClick={() => handleCategoryClick(cat.id)}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No matching categories.</p>
      )}

      <AddCategoryModal
        show={showModal}
        onClose={resetForm}
        onSubmit={handleAddOrEditCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        isEdit={isEdit}
      />

      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default Categories;
