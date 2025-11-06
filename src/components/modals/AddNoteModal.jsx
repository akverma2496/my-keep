import { useEffect } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  // Update editor content whenever we open modal for editing
  useEffect(() => {
    if (editor && show) {
      editor.commands.setContent(content || "");
    }
  }, [editor, show, content]);

  return (
    <Modal
      opened={show}
      onClose={onClose}
      trapFocus={false}
      centered
      title={isEdit ? "Edit Note" : "Add Note"}
      size="lg"
    >
      <form onSubmit={onSubmit}>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          mb="md"
        />

        {editor && (
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
              </RichTextEditor.ControlsGroup>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
              </RichTextEditor.ControlsGroup>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
          </RichTextEditor>
        )}

        <div className="d-flex justify-content-end mt-3 gap-2">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;
