import React, { useState } from "react";
import Header from "../components/Header";
import NoteBody from "../components/NoteBody";
import { Link } from "react-router-dom";
import { getAllNotes } from "../utils/local-data";

const HomePage = () => {
  const initialNotes = getAllNotes();
  const [notes, setNotes] = useState(initialNotes);
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <div className="note-app">
        <Header />

        <NoteBody
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          notes={notes}
          setNotes={setNotes}
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
