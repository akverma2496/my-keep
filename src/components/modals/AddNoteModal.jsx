import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddNoteModal = ({
  show,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  onSubmit,
  isEdit = false,
}) => {
  const quillRef = useRef(null);

  const handleEditorChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    if (!isEdit && show) {
      // Clear the fields if it's a new note (not in edit mode)
      setTitle('');
      setContent('');
    }
  }, [show, isEdit, setTitle, setContent]);

  // Update the editor content when the modal opens in edit mode
  useEffect(() => {
    if (isEdit && show && content) {
      // Set content for editing when the modal is shown in edit mode
      setContent(content);
      setTitle(title); // Set title for editing
    }
  }, [show, content, title, isEdit, setContent, setTitle]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {/* Title Input */}
          <Form.Group controlId="noteTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          {/* ReactQuill Editor */}
          <div className="editor-container" style={{ marginTop: '20px' }}>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={handleEditorChange}
              theme="snow"
            />
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" onClick={onSubmit} variant="primary">
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteModal;