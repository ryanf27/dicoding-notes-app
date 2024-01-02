import React, { useState, useEffect } from "react";
import { getArchivedNotes, deleteNote } from "../utils/local-data";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ArchivedNotesPage = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    setArchivedNotes(getArchivedNotes());
  }, []);

  const handleDeleteNote = (id) => {
    deleteNote(id);
    setArchivedNotes(getArchivedNotes());
  };

  return (
    <>
      <Header />
      <div className="note-app__body">
        <h2>Daftar Catatan Diarsipkan</h2>

        {archivedNotes.length > 0 ? (
          <ul className="notes-list">
            {archivedNotes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-item__content">
                  <Link to={`/note/${note.id}`}>
                    <strong className="note-item__title">{note.title}</strong>
                  </Link>
                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    className="note-item__delete-button"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="notes-list__empty-message">
            Tidak ada catatan diarsipkan.
          </p>
        )}
      </div>
    </>
  );
};

export default ArchivedNotesPage;
