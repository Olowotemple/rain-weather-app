import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../components/Logo';
import CityWeatherData from '../components/CityWeatherData';
import AddNote from '../components/AddNote';
import Notes from '../components/Notes';
import weatherService from '../services/weather';
import { formatUtcOffset } from '../utils/helperFunctions';
import { useFavouriteContext } from '../contexts/FavouriteContext';
import { ReactComponent as RemoveFromFavouriteIcon } from '../svg/removeFromFavourites.svg';
import { ReactComponent as AddToFavouriteIcon } from '../svg/addToFavourites.svg';

const Detail = () => {
  const [detail, setDetail] = useState({});
  const [cityNotes, setCityNotes] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState({});
  const { city: cityName } = useParams();
  const { favourites, addToFavourite, removeFromFavourite } =
    useFavouriteContext();

  useEffect(() => {
    (async function () {
      try {
        const detail = await weatherService.getWeatherData(cityName);
        setDetail(detail);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [cityName]);

  const removeNote = (id) => {
    const cityNote = cityNotes.find((cityNote) => cityNote.city === cityName);
    const filteredCityNotes = cityNotes.filter(
      (cityNote) => cityNote.city !== cityName
    );
    const filteredNotes = cityNote.notes.filter((note) => note.id !== id);
    const newCityNote = { ...cityNote, notes: filteredNotes };
    const newCityNotes = [...filteredCityNotes, newCityNote];
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
    setCityNotes(newCityNotes);
    setText(editNote.text);
  };

  const submitNote = (evt) => {
    evt.preventDefault();
    if (isEditing) {
      const { id: isEditingId } = isEditingNote;
      const editedNote = {
        ...isEditingNote,
        text: text,
        updatedAt: new Date(),
      };
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
      setCityNotes(newCityNotes);
      setText('');
      setIsEditing(false);
    } else {
      const newNote = {
        id: uuidv4(),
        text: text,
        createdAt: new Date(),
      };
      if (
        cityNotes.length &&
        cityNotes.find((note) => note.city === cityName)
      ) {
        const cityNote = cityNotes.find((note) => note.city === cityName);
        const filteredCityNotes = cityNotes.filter(
          (cityNote) => cityNote.city !== cityName
        );
        const notes = [newNote, ...cityNote.notes];
        const cityNoteToSave = { ...cityNote, notes };
        setCityNotes([...filteredCityNotes, cityNoteToSave]);
      } else {
        const cityNote = { city: cityName, notes: [newNote] };
        setCityNotes([...cityNotes, cityNote]);
      }
      setText('');
    }
  };

  const handleFavouriteAction = (evt, name) => {
    evt.stopPropagation();
    const basis = evt.target.getAttribute('aria-label');
    if (basis === 'add to favourites') {
      return addToFavourite(name);
    }
    removeFromFavourite(name);
  };

  const notesToShow =
    cityNotes.filter((note) => note.city === cityName)[0]?.notes || [];

  if (Object.keys(detail).length) {
    const { request, location, current } = detail;
    const { name, localtime: localTime, utc_offset } = location;
    const { query } = request;
    const utcOffset = formatUtcOffset(utc_offset);

    return (
      <div className="detail">
        <Logo />
        <section className="city-details">
          <h1 className="city-details__name">
            {name}{' '}
            <button
              className={`city__action ${
                favourites.includes(name)
                  ? 'city__action--remove'
                  : 'city__action--add'
              }`}
              onClick={(evt) => handleFavouriteAction(evt, name)}
            >
              {favourites.includes(name) ? (
                <RemoveFromFavouriteIcon />
              ) : (
                <AddToFavouriteIcon />
              )}
            </button>
          </h1>
          <p className="city-details__fullname">{query}</p>
          <p className="city-details__localtime">
            {new Date(localTime).toLocaleTimeString('en-US')}
          </p>
          <p className="city-details__timezone">{`GMT${utcOffset}`}</p>
        </section>

        <section className="city__info">
          <CityWeatherData current={current} />
          <div className="city__notes">
            <AddNote
              text={text}
              setText={setText}
              submitNote={submitNote}
              isEditing={isEditing}
            />
            <Notes
              notes={notesToShow}
              removeNote={removeNote}
              editNote={editNote}
            />
          </div>
        </section>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default Detail;
