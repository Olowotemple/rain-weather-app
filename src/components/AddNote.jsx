import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToStorage } from '../utils/helperFunctions';

const AddNote = ({
  text,
  setText,
  isEditing,
  setIsEditing,
  isEditingNote,
  cityNotes,
  setCityNotes,
  cityName,
  setNotification,
}) => {
  const timerIDRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerIDRef.current);
    };
  }, []);

  const submitNote = (evt) => {
    evt.preventDefault();

    if (isEditing) {
      const { id: isEditingId } = isEditingNote;
      const editedNote = {
        ...isEditingNote,
        text: text,
        updatedAt: new Date(),
      };

      if (!editedNote.text.length) {
        // Do not accept empty edits
        setNotification({ msg: 'You cannot save an empty edit', warn: true });
        timerIDRef.current = setTimeout(() => {
          setNotification(null);
        }, 2500);
        return;
      }

      if (editedNote.text === isEditingNote.text) {
        // Note is not acutally edited, delete redundant updatedAt key
        delete editedNote.updatedAt;
      }
      const cityNote = cityNotes.find((cityNote) => cityNote.city === cityName);
      const filteredCityNotes = cityNotes.filter(
        (cityNote) => cityNote.city !== cityName
      );
      const filteredNotes = cityNote.notes.filter(
        (note) => note.id !== isEditingId
      );
      const newNotes = [editedNote, ...filteredNotes];
      const newCityNote = { ...cityNote, notes: newNotes };
      const newCityNotes = [...filteredCityNotes, newCityNote];
      saveToStorage('cityNotes', newCityNotes);
      setNotification({ msg: 'Your edit was successfully saved' });
      timerIDRef.current = setTimeout(() => {
        setNotification(null);
      }, 2500);
      setCityNotes(newCityNotes);
      setText('');
      setIsEditing(false);
    } else {
      const newNote = {
        id: uuidv4(),
        text: text,
        createdAt: new Date(),
      };

      if (!newNote.text.length) {
        // Don't accept empty notes
        setNotification({ msg: 'You cannot save an empty note', warn: true });
        timerIDRef.current = setTimeout(() => {
          setNotification(null);
        }, 2500);
        return;
      }

      if (
        cityNotes.length &&
        cityNotes.find((note) => note.city === cityName)
      ) {
        const cityNote = cityNotes.find((note) => note.city === cityName);
        const filteredCityNotes = cityNotes.filter(
          (cityNote) => cityNote.city !== cityName
        );
        const notes = [newNote, ...cityNote.notes];
        const newCityNote = { ...cityNote, notes };
        const newCityNotes = [...filteredCityNotes, newCityNote];
        saveToStorage('cityNotes', newCityNotes);

        setCityNotes(newCityNotes);
      } else {
        const newCityNote = { city: cityName, notes: [newNote] };
        const newCityNotes = [...cityNotes, newCityNote];
        saveToStorage('cityNotes', newCityNotes);
        setCityNotes(newCityNotes);
      }
      setNotification({ msg: 'Your note was successfully saved' });
      timerIDRef.current = setTimeout(() => {
        setNotification(null);
      }, 2500);
      setText('');
    }
  };

  return (
    <form className="add-note" onSubmit={submitNote}>
      <textarea
        id="addNote"
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        placeholder="it's great outside, isn't it? then write a note..."
      ></textarea>
      <button type="submit" className="add-note__submit">
        {isEditing ? 'Save edit' : 'Add a note'}
      </button>
    </form>
  );
};

export default AddNote;
