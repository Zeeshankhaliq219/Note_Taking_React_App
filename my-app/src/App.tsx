import { useState } from "react";
import { Note } from "./componets/note_types";
import "./App.css"

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAddNoteForm = (event: React.FormEvent) => {
    event.preventDefault();

    const noteObj: Note = {
      text: inputText,
      id: Math.random() + inputText,
    };

    // const arr: number[] = [];
    // const updatedArr = arr;
    // updatedArr.push(1);

    // const updatedArrTwo = [...arr];
    // updatedArrTwo.push(2);
    // console.log(arr); // []

    // immutability
    // State of a component is immutable
    setNotes([...notes, noteObj]);
    // notes.push(noteObj);
    // setNotes(notes);
    resetStates();
  };

  const handleNoteInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const inputText = event.target.value;
    setInputText(inputText);
  };

  const handleEdit = (id: string) => {
    console.log("handleEdit");
    setIsEditing(true);
    // Get the note which is editing
    // Input field text changed to the edited note
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note.id === id) {
        setInputText(note.text);
        setSelectedNoteId(note.id);
        break;
      }
    }
    // button text updated from add to update
    // Instead of adding new note it should update the note
  };

  const handleDelete = (id: string) => {
    const updatedArr = notes.filter((note) => note.id !== id);
    setNotes(updatedArr);
  };

  const resetStates = () => {
    setIsEditing(false);
    setInputText("");
    setSelectedNoteId("");
  };

  const handleUpdateNote: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const updatedArr = notes.map((note) => {
      if (note.id === selectedNoteId) {
        note.text = inputText;
      }
      return note;
    });

    setNotes(updatedArr);
    resetStates();
  };

  return (
    <div className="App">
      <form className="main" onSubmit={isEditing ? handleUpdateNote : handleAddNoteForm}>
        <input
        className="input"
          type="text"
          required
          onChange={handleNoteInputChange}
          placeholder="Please add text here"
          value={inputText}
        />
        <button className="addButton" type="submit">{isEditing ? "Update Note" : "Add note"}</button>
        {isEditing && <button className="addButton" onClick={resetStates}>Cancel</button>}
      </form>
      {notes.map((note, i) => (
        <div key={note.id}>
          <div className="textparent">
          <h1 className="text">{note.text}</h1>
          </div>
          <button className="btn" onClick={() => handleEdit(note.id)}>Edit</button>
          <button className="btn" onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;