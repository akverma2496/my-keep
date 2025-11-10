import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Modal, Button } from 'react-bootstrap';

const ViewNoteModal = ({ show, onClose, note }) => {
  const [editorContent, setEditorContent] = React.useState('');

  useEffect(() => {
    if (show && note?.content) {
      setEditorContent(note.content);
    }
  }, [show, note]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{note?.title || 'View Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="editor-container" style={{ marginTop: '20px' }}>
          <ReactQuill
            value={editorContent}
            theme="snow"
            readOnly
            modules={{ toolbar: false }}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewNoteModal;
