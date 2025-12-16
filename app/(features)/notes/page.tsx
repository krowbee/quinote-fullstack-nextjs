import NoteAside from "./components/NoteAside";
import NoteBlock from "./components/NoteBlock";
import { PublicNote } from "@/domains/notes/types/note.types";
import { serverFetchToApi } from "@/lib/api/http-server";

export default async function NotesPage() {
  const res = await serverFetchToApi("/api/notes");
  const json = await res.json();
  const InitialNoteList: PublicNote[] = json.notes || null;
  return (
    <main>
      <div className="w-full min-h-screen flex pt-20">
        <NoteAside initialNoteList={InitialNoteList} />
        <NoteBlock />
      </div>
    </main>
  );
}
