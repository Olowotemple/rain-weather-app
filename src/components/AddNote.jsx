const AddNote = ({ text, setText, submitNote, isEditing }) => {
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
