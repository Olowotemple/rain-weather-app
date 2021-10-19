import { useState } from 'react';
import AddNote from '../components/AddNote';
import Note from './Note';
import { readFromStorage, saveToStorage } from '../utils/helperFunctions';
import { ReactComponent as SavedIcon } from '../svg/saveNote.svg';

const Notes = ({ cityName, setNotification }) => {
  const [cityNotes, setCityNotes] = useState(
    readFromStorage('cityNotes') || []
  );
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState({});

  const removeNote = (id) => {
    const cityNote = cityNotes.find((cityNote) => cityNote.city === cityName);
    const filteredCityNotes = cityNotes.filter(
      (cityNote) => cityNote.city !== cityName
    );
    const filteredNotes = cityNote.notes.filter((note) => note.id !== id);
    const newCityNote = { ...cityNote, notes: filteredNotes };
    const newCityNotes = [...filteredCityNotes, newCityNote];
    saveToStorage('cityNotes', newCityNotes);
    setNotification({ msg: 'Your note was successfully deleted' });
    setTimeout(() => {
      setNotification(null);
    }, 2500);
    setCityNotes(newCityNotes);
  };

  const editNote = (id) => {
    setIsEditing(true);
    const cityNote = cityNotes.find((cityNote) => cityNote.city === cityName);
    const filteredCityNotes = cityNotes.filter(
      (cityNote) => cityNote.city !== cityName
    );
    const editNote = cityNote.notes.find((note) => note.id === id);
    setIsEditingNote(editNote);
    const filteredNotes = cityNote.notes.filter((note) => note.id !== id);
    const newCityNote = { ...cityNote, notes: filteredNotes };
    const newCityNotes = [...filteredCityNotes, newCityNote];
    saveToStorage('cityNotes', newCityNotes);
    setCityNotes(newCityNotes);
    setText(editNote.text);
  };

  const notes =
    cityNotes.filter((note) => note.city === cityName)[0]?.notes || [];

  return (
    <div className="notes">
      <AddNote
        text={text}
        setText={setText}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isEditingNote={isEditingNote}
        cityNotes={cityNotes}
        setCityNotes={setCityNotes}
        cityName={cityName}
        setNotification={setNotification}
      />
      {notes.length ? (
        <div className="notes__view">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              removeNote={removeNote}
              editNote={editNote}
              setNotification={setNotification}
            />
          ))}
        </div>
      ) : (
        <div className="notes__view notes__view--empty">
          <SavedIcon />
          <p className="notes__view--empty__desc">Saved notes appear here...</p>
        </div>
      )}
    </div>
  );
};

export default Notes;
