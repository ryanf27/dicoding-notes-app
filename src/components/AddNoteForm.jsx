import React, { useState } from "react";
import { addNote } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const AddNoteForm = () => {
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const maxTitleLength = 50;

  const handleAddNote = async () => {
    if (newNote.title && newNote.body) {
      const { error } = await addNote({
        title: newNote.title,
        body: newNote.body,
      });

      if (!error) {
        setNewNote({ title: "", body: "" });
        navigate("/");
      } else {
        console.error("Gagal menambahkan catatan");
      }
    }
  };

  return (
    <div className="note-input">
      <h2>Tambah Catatan Baru</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote();
        }}
      >
        <label>
          Judul:
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => {
              if (e.target.value.length <= maxTitleLength) {
                setNewNote({ ...newNote, title: e.target.value });
              }
            }}
          />
          <span className="note-input__title__char-limit">
            {newNote.title.length}/{maxTitleLength}
          </span>
        </label>
        <br />
        <label>
          Isi Catatan:
          <textarea
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
};

export default AddNoteForm;
