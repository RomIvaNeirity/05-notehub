import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

import { fetchNotes } from "../../services/noteService.ts";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage + 1, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found.");
    }
  }, [data]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox value={search} onChange={setSearch} />}
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
                onSuccess={() => setModalOpen(false)}
              />
            }
          />
        )}
      </header>
      {data && <NoteList notes={data.notes} />}
      <Toaster />
    </div>
  );
}
export default App;
