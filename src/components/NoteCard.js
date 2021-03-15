import React from "react"

const NoteCard = ({ data, editNote, deleteNote }) => {
  return (
    <>
      {data.map((note) => (
        <div className="card" key={note.id}>
          <div className="card-header">
            <h2>{note.title}</h2>
          </div>
          <div className="card-body">
            <p>{note.description}</p>
          </div>
          <hr />
          <div className="card-footer">
            <button
              className="btn-edit"
              onClick={() => editNote(note.id, note.title, note.description)}
            >
              Edit
            </button>
            <button className="btn-delete" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default NoteCard
