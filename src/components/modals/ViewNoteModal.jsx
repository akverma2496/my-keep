// src/components/modals/ViewNoteModal.jsx
import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ViewNoteModal = ({ show, onClose, note }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: "", // initialize empty, then update later
  });

  // ✅ Update content once modal is open & note changes
  useEffect(() => {
    if (editor && note?.content) {
      editor.commands.setContent(note.content);
    }
  }, [editor, note, show]);

  return (
    <Modal
      opened={show}
      onClose={onClose}
      centered
      title={note?.title || "View Note"}
      size="lg"
    >
      {editor && (
        <RichTextEditor editor={editor}>
          <RichTextEditor.Content />
        </RichTextEditor>
      )}
    </Modal>
  );
};

export default ViewNoteModal;
