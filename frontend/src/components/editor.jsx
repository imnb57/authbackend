import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'quill/dist/quill.snow.css';

const Editor = ({ selectedNote, onSaveNote }) => {
  const [editorValue, setEditorValue] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setEditorValue(selectedNote.content || '');
      setTitle(selectedNote.title || 'Untitled');
    } else {
      setEditorValue('');
      setTitle('');
    }
  }, [selectedNote]);

  const handleSave = () => {
    onSaveNote({ title, content: editorValue });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={setEditorValue}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'blockquote',
          'code-block',
          'link',
          'image',
        ]}
        className="h-64 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Save Note
      </button>
    </div>
  );
};

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote) {
        await axios.put(
          `http://127.0.0.1:8000/api/notes/${selectedNote.id}/`,
          noteData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
          }
        );
      } else {
        await axios.post('http://127.0.0.1:8000/api/notes/', noteData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
      }
      fetchNotes();
      setSelectedNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Notes App</h1>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Notes</h2>
          <button
            onClick={() => setSelectedNote(null)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            New Note
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border rounded-lg shadow-md cursor-pointer ${
                selectedNote?.id === note.id ? 'bg-blue-100' : 'bg-white'
              }`}
            >
              <h3 className="text-lg font-medium">{note.title}</h3>
            </div>
          ))}
        </div>
        <Editor selectedNote={selectedNote} onSaveNote={handleSaveNote} />
      </div>
    </div>
  );
};

export default NoteApp;
