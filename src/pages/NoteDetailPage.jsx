import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/utils";
import Header from "../components/Header";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { error, data } = await getNote(id);

      if (!error) {
        setNote(data);
      } else {
        console.error("Gagal mengambil detail catatan");
      }
    };

    fetchNote();
  }, [id]);

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
