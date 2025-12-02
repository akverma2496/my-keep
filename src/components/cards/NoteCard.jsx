import React, { useState, useRef, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { MdEdit, MdDelete, MdArchive, MdMoreVert, MdDescription, MdAccessTime, MdUpdate, MdPalette } from "react-icons/md";

const NoteCard = ({ note, onDelete, onEdit, onView, onColorChange, onArchive, isArchivedView = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dropdownRef = useRef(null);
  const colorPickerRef = useRef(null);

  // Light color palette
  const colors = [
    { name: "White", value: "#FFFFFF" },
    { name: "Light Blue", value: "#E3F2FD" },
    { name: "Light Green", value: "#E8F5E9" },
    { name: "Light Yellow", value: "#FFF9C4" },
    { name: "Light Pink", value: "#FCE4EC" },
    { name: "Light Purple", value: "#F3E5F5" },
    { name: "Light Orange", value: "#FFE0B2" },
    { name: "Light Teal", value: "#E0F2F1" },
    { name: "Light Gray", value: "#F5F5F5" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };

    if (showDropdown || showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showColorPicker]);

  const handleCardClick = (event) => {
    if (event.target.closest("button") || event.target.closest(".dropdown")) return;
    onView();
  };

  const handleColorSelect = (color) => {
    if (onColorChange) {
      onColorChange(note.id, color);
    }
    setShowColorPicker(false);
  };

  // Format date helper - handles both Date objects and pre-formatted strings
  const formatDate = (dateString) => {
    if (!dateString) return "—";

    // If it's already a formatted string (not a valid date), return as-is
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return the pre-formatted string
    }

    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Strip HTML tags for preview
  const getTextPreview = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || "";
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  const noteColor = note.color || "#FFFFFF";

  return (
    <Card
      onClick={handleCardClick}
      className="border-0 shadow-sm h-100 position-relative"
      style={{
        borderRadius: "16px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        overflow: "visible",
        backgroundColor: noteColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
      }}
    >
      {/* Top strip with note color */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))`,
        }}
      />

      <Card.Body className="d-flex flex-column" style={{ padding: "20px" }}>
        {/* Header with title and menu */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2 flex-grow-1">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                flexShrink: 0,
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            >
              <MdDescription size={20} style={{ color: "rgba(0,0,0,0.6)" }} />
            </div>
            <div className="flex-grow-1 d-flex align-items-center" style={{ minWidth: 0 }}>
              <h6
                className="mb-0 fw-semibold"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1",
                  wordBreak: "break-word",
                  color: "rgba(0,0,0,0.85)",
                }}
              >
                {note.title}
              </h6>
            </div>
          </div>

          {/* More options menu */}
          <div className="position-relative" ref={dropdownRef}>
            <Dropdown show={showDropdown} align="end">
              <Dropdown.Toggle
                as="button"
                bsPrefix="custom-dropdown"
                className="btn btn-light p-1 rounded-circle border-0"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
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
                    if (onArchive) onArchive(note.id);
                  }}
                  className="d-flex align-items-center gap-2"
                >
                  {isArchivedView ? <MdArchive size={18} /> : <MdArchive size={18} />}
                  <span>{isArchivedView ? "Unarchive" : "Archive"}</span>
                </Dropdown.Item>

                {/* <Dropdown.Divider /> */}

                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    setShowColorPicker(true);
                  }}
                  className="d-flex align-items-center gap-2"
                >
                  <MdPalette size={18} />
                  <span>Color</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    onEdit();
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
                    onDelete(note.id);
                  }}
                  className="d-flex align-items-center gap-2 text-danger"
                >
                  <MdDelete size={18} />
                  <span>Delete</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Color Picker Popup */}
        {showColorPicker && (
          <div
            ref={colorPickerRef}
            className="position-absolute bg-white shadow-lg border rounded p-3"
            style={{
              top: "60px",
              right: "20px",
              zIndex: 1000,
              minWidth: "200px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 fw-semibold small">Choose Color</div>
            <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {colors.map((color) => (
                <button
                  key={color.value}
                  className="btn p-0 border-0 position-relative"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: color.value,
                    borderRadius: "8px",
                    border: noteColor === color.value ? "3px solid #0d6efd" : "2px solid #dee2e6",
                    transition: "all 0.2s",
                  }}
                  onClick={() => handleColorSelect(color.value)}
                  title={color.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {noteColor === color.value && (
                    <div
                      className="position-absolute top-50 start-50 translate-middle"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(13, 110, 253, 0.3)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content preview */}
        <div
          className="mb-3 flex-grow-1"
          style={{
            fontSize: "0.9rem",
            lineHeight: "1.6",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            color: "rgba(0,0,0,0.7)",
          }}
        >
          {getTextPreview(note.content)}
        </div>

        {/* Footer with timestamps */}
        <div
          className="d-flex flex-column gap-1 pt-3"
          style={{
            fontSize: "0.8rem",
            color: "rgba(0,0,0,0.6)",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <MdAccessTime size={14} style={{ opacity: 0.7 }} />
            <span>Created {formatDate(note.createdAt)}</span>
          </div>
          {note.updatedAt && (
            <div className="d-flex align-items-center gap-2">
              <MdUpdate size={14} style={{ opacity: 0.7 }} />
              <span>Updated {formatDate(note.updatedAt)}</span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;