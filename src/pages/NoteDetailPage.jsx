import React from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/local-data";
import Header from "../components/Header";

const NoteDetail = () => {
  const { id } = useParams();
  const note = getNote(id);

  if (!note) {
    return <p>Catatan tidak ditemukan.</p>;
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <div className="note-detail">
        <h2>{note.title}</h2>
        <p>{formattedDate}</p>
        <p>{note.body}</p>
      </div>
    </>
  );
};

export default NoteDetail;
