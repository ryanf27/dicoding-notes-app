import React, { useState, useEffect } from "react";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/utils";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ArchivedNotesPage = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const { error, data } = await getArchivedNotes();

      if (!error) {
        setArchivedNotes(data);
      } else {
        console.error("Gagal mengambil catatan diarsipkan");
      }
    };

    fetchArchivedNotes();
  }, []);

  const handleActionNote = async (id, action) => {
    let result = null;

    if (action === "delete") {
      result = await deleteNote(id);
    } else if (action === "unarchive") {
      result = await unarchiveNote(id);
    }

    if (!result?.error) {
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } else {
      console.error("gagal");
    }
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
                    className="note-item__unarchive-button"
                    onClick={() => handleActionNote(note.id, "unarchive")}
                  >
                    Aktifkan
                  </button>
                  <button
                    className="note-item__delete-button"
                    onClick={() => handleActionNote(note.id, "delete")}
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
