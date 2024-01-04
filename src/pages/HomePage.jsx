import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NoteBody from "../components/NoteBody";
import { Link } from "react-router-dom";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/utils";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    const { error } = await deleteNote(id);

    if (!error) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } else {
      console.error("Gagal menghapus catatan");
    }
  };

  const handleArchiveNote = async (id) => {
    const { error } = await archiveNote(id);

    if (!error) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, archived: true } : note
        )
      );
    } else {
      console.error("Gagal mengarsipkan catatan");
    }
  };

  return (
    <>
      <div className="note-app">
        <Header />

        <NoteBody
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          notes={notes}
          setNotes={setNotes}
          onDeleteNote={handleDeleteNote}
          onArchiveNote={handleArchiveNote}
        />
      </div>

      <button className="add-button">
        <Link to="/addnotepage">
          <img src="/edit.png" alt="Add Note" />
        </Link>
      </button>
    </>
  );
};

export default HomePage;
