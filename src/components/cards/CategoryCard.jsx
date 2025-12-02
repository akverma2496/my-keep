import React, { useState, useRef, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { MdEdit, MdDelete, MdMoreVert, MdFolder } from "react-icons/md";

const CategoryCard = ({
  category,
  onDelete,
  onEdit,
  onClick,
  accentColor = "#6c757d", // Default to Bootstrap secondary color
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="border-0 shadow-sm bg-body"
      style={{
        borderRadius: "18px",
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        transition: "0.25s ease",
      }}
    >
      {/* Accent strip - using dark/secondary for theme compatibility */}
      <div
        className="bg-dark"
        style={{
          width: "6px",
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <Card.Body
        className="d-flex align-items-center justify-content-between"
        style={{ padding: "18px 20px 18px 28px" }}
      >
        {/* Left Side */}
        <div className="d-flex align-items-center gap-3 flex-grow-1">
          {/* Icon Box */}
          <div
            className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              flexShrink: 0,
            }}
          >
            <MdFolder size={20} className="text-secondary" />
          </div>
          {/* Text Section */}
          <div className="d-flex flex-column justify-content-center" style={{ marginTop: "-2px" }}>
            {/* Title properly aligned */}
            <div
              className="fw-semibold text-body"
              style={{
                fontSize: "1.02rem",
                whiteSpace: "nowrap",
                overflow: "visible",
                lineHeight: "1",
                marginBottom: "2px",
              }}
            >
              {category.name}
            </div>
            {/* Description */}
            {category?.description && (
              <div
                className="text-muted"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: "1.2",
                  marginTop: "2px",
                }}
              >
                {category.description}
              </div>
            )}
          </div>
        </div>
        {/* Actions - More Options Menu */}
        <div className="position-relative" ref={dropdownRef}>
          <Dropdown show={showDropdown} align="end">
            <Dropdown.Toggle
              as="button"
              bsPrefix="custom-dropdown"
              className="btn btn-light p-1 rounded-circle border-0 shadow-sm"
              style={{ 
                width: 36, 
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              <MdMoreVert size={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "160px" }}>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  onEdit(category);
                }}
                className="d-flex align-items-center gap-2"
              >
                <MdEdit size={18} />
                <span>Edit</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  onDelete(category.id);
                }}
                className="d-flex align-items-center gap-2 text-danger"
              >
                <MdDelete size={18} />
                <span>Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;