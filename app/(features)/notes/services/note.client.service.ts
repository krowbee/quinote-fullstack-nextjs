import { PublicNote } from "@/domains/notes/types/note.types";
import { fetchToApi } from "@/lib/api/http-client";
import { UpdateNoteDto } from "../dto/notes.dto";

export async function fetchNotes(): Promise<PublicNote[]> {
  const res = await fetchToApi("/api/notes", { method: "GET" });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.notes as PublicNote[]) || [];
}

export async function createNote(): Promise<PublicNote | undefined> {
  const res = await fetchToApi("/api/notes", {
    method: "POST",
  });

  if (!res.ok) return;

  const json = await res.json();
  return json.note;
}

export async function updateNote(
  noteId: number,
  data: UpdateNoteDto
): Promise<boolean> {
  const res = await fetchToApi(`/api/notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return res.ok;
}

export async function deleteNote(noteId: number): Promise<boolean> {
  const res = await fetchToApi(`/api/notes/${noteId}`, { method: "DELETE" });
  return res.ok;
}
