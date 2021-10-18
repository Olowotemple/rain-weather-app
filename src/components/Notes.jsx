import Note from './Note';
import { ReactComponent as SavedIcon } from '../svg/saveNote.svg';

const Notes = ({ notes, editNote, removeNote }) => {
  if (notes.length) {
    return (
      <div className="notes">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            removeNote={removeNote}
            editNote={editNote}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="notes notes--empty">
      <SavedIcon />
      <p className="notes__desc">Saved notes appear here...</p>
    </div>
  );
};

export default Notes;
