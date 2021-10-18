import { formatNoteDate } from '../utils/helperFunctions';
import { ReactComponent as EditNoteIcon } from '../svg/editNote.svg';
import { ReactComponent as RemoveNoteIcon } from '../svg/removeNote.svg';

const Note = ({ note, editNote, removeNote }) => {
  const { id, text, createdAt } = note;
  const [time, date] = formatNoteDate(createdAt);

  return (
    <div className="note">
      <div className="note__main">{text}</div>
      <div className="note__footer">
        <p className="note__date-created">{`${time} - ${date}`}</p>
        <div className="note__footer__actions">
          <button
            className="note__footer__actions__edit"
            onClick={() => editNote(id)}
          >
            <EditNoteIcon />
          </button>

          <button
            className="note__footer__actions__remove"
            onClick={() => removeNote(id)}
          >
            <RemoveNoteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
