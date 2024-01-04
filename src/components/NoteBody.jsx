import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/utils";

const NoteBody = ({
  searchKeyword,
  setSearchKeyword,
  notes,
  setNotes,
  onDeleteNote,
  onArchiveNote,
}) => {
  useEffect(() => {
    const fetchNotes = async () => {
      const { error, data } = await getActiveNotes();

      if (!error) {
        setNotes(data || []);
      } else {
        console.error("Gagal mengambil catatan");
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      !note.archived
  );

  const handleDeleteNote = async (id) => {
    const { error } = await deleteNote(id);

    if (!error) {
      onDeleteNote(id);
    } else {
      console.error("Gagal menghapus catatan");
    }
  };

  const handleArchiveNote = async (id) => {
    const { error } = await archiveNote(id);

    if (!error) {
      onArchiveNote(id);
    } else {
      console.error("Gagal mengarsipkan catatan");
    }
  };

  return (
    <>
      <div className="note-app__body">
        <div className="note-search">
          <label>Cari Catatan:</label>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <h2>Daftar Catatan</h2>
        {filteredNotes.length > 0 ? (
          <ul className="notes-list">
            {filteredNotes.map((note) => (
              <li key={note.id} className="note-item">
                <div className="note-item__content">
                  <Link to={`/note/${note.id}`}>
                    <strong className="note-item__title">{note.title}</strong>
                  </Link>
                  <p className="note-card__createdAt">
                    {new Date(note.createdAt).toLocaleString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <p className="note-item__body">{note.body}</p>
                </div>
                <div className="note-item__action">
                  <button
                    className="note-item__archive-button"
                    onClick={() => handleArchiveNote(note.id)}
                  >
                    Arsipkan
                  </button>
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
          <p className="notes-list__empty-message">Tidak ada catatan.</p>
        )}
      </div>
    </>
  );
};

NoteBody.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onArchiveNote: PropTypes.func.isRequired,
};

export default NoteBody;
