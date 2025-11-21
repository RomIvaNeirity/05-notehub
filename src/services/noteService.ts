import axios from "axios";
import type { Note } from "../types/note";
import type { NoteFormValues } from "../types/noteFormValues";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number
}



export async function fetchNotes(page: number = 1): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: {
        page,
        perPage: 12
    },
      
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  console.log("DATA:", response.data);
  return response.data;
}

export async function createNote(noteValues: NoteFormValues) {
    
  
  const response = await axios.post(
    "https://notehub-public.goit.study/api/notes/", noteValues, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
  }
  )
  
  console.log(response.data);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {     
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    
    })
console.log(response.data)
  return response.data;
  
}