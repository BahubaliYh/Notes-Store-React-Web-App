import React, { useState, useEffect } from "react"
import "./App.css"
import NoteCard from "./components/NoteCard"
import Modal from "react-modal"

function App() {
  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({ title: "", description: "" })
  const [modalForm, setmodalForm] = useState({
    id: null,
    title: "",
    description: "",
  })
  const [error, setError] = useState(null)
  const [modalIsOpen, setmodalIsOpen] = useState(false)

  const addNote = (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length === 0) {
      setNotes([
        ...notes,
        {
          id: notes.length,
          title: form.title,
          description: form.description,
        },
      ])

      setForm({ title: "", description: "" })
      setError("")
    } else {
      setError(err.title)
    }
  }

  const updateNote = (e) => {
    e.preventDefault()
    setmodalIsOpen(false)
    const items = notes
    items.map((item) => {
      if (item.id === modalForm.id) {
        item.title = modalForm.title
        item.description = modalForm.description
      }
    })

    setNotes(items)
  }

  const validate = () => {
    let errors = {}
    const checkTitle = (obj) => obj.title === form.title
    if (notes.some(checkTitle)) {
      errors.title = "Title Already Exist"
    }
    return errors
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const ModalhandleChange = (e) => {
    setmodalForm({
      ...modalForm,
      [e.target.name]: e.target.value,
    })
  }

  const editNote = (id, title, description) => {
    setmodalIsOpen(true)
    setmodalForm({ id: id, title: title, description: description })
  }

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id)
    setNotes(filteredNotes)
    console.log("filteredNotes", id)
  }

  return (
    <div className="App">
      <h1 className="header">Store Notes</h1>
      <div className="note-form">
        <form action="" onSubmit={addNote}>
          <input
            type="text"
            placeholder="Enter The Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <p>{error}</p>
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="Enter The Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>

      <div className="card-container">
        {notes && (
          <NoteCard data={notes} editNote={editNote} deleteNote={deleteNote} />
        )}
      </div>

      <Modal isOpen={modalIsOpen}>
        <h2>Edit Note</h2>
        <div className="note-form">
          <form action="" onSubmit={updateNote}>
            <input
              type="text"
              placeholder="Enter The Title"
              name="title"
              value={modalForm.title}
              onChange={ModalhandleChange}
              required
            />
            <p>{error}</p>
            <textarea
              id=""
              cols="30"
              rows="10"
              placeholder="Enter The Description"
              name="description"
              value={modalForm.description}
              onChange={ModalhandleChange}
              required
            ></textarea>
            <button type="submit" className="btn">
              Update
            </button>
            <button
              className="btn bg-danger"
              onClick={() => setmodalIsOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default App
