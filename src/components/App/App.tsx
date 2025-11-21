import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

import css from "./App.module.css";

import Pagination from "../Pagination/Pagination.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

import {
  fetchNotes,
  createNote,
  deleteNote,
} from "../../services/noteService.ts";

import type { NoteFormValues } from "../../types/noteFormValues.ts";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: () => fetchNotes(currentPage + 1),
    placeholderData: keepPreviousData,
  });

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    refetch();
  };

  const handleCreateNote = async (values: NoteFormValues) => {
    await createNote(values);
    refetch();
    setModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {
          <button className={css.button} onClick={() => setModalOpen(true)}>
            Create note +
          </button>
        }
        {modalOpen && (
          <Modal
            onClose={() => setModalOpen(false)}
            children={
              <NoteForm
                onCancel={() => setModalOpen(false)}
                onSubmit={handleCreateNote}
              />
            }
          />
        )}
      </header>
      {data && <NoteList notes={data.notes} onDelete={handleDelete} />}
    </div>
  );
}
export default App;
