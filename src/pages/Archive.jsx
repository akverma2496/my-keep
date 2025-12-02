import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { unarchiveNoteAsync } from "../redux/actions/noteActions";
import NoteCard from "../components/cards/NoteCard";


const Archive = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth);
  const { notes } = useSelector((s) => s.note);

  const archivedNotes = notes.filter((n) => n.isArchived);

  return (
    <div className="container py-4">
      <h3 className="mb-3">Archived Notes</h3>

      <div className="row g-3">
        {archivedNotes.length === 0 && <p>No archived notes.</p>}

        {archivedNotes.map((note) => (
          <div key={note.id} className="col-md-4">
            <NoteCard
              note={note}
              onDelete={(id) => dispatch(removeNoteAsync(id))} // permanent delete
              onEdit={() => {}}
              onView={() => {}}
              onArchive={(noteId) => dispatch(unarchiveNoteAsync(token, user.localId, note.categoryId, noteId))}
              isArchivedView={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
