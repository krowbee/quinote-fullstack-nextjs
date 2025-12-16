import NoteAside from "./components/NoteAside";
import NoteBlock from "./components/NoteBlock";
import { PublicNote } from "@/domains/notes/types/note.types";
import { getInitialNotes } from "./api/note.server.api";

export default async function NotesPage() {
  const initialNoteList: PublicNote[] = (await getInitialNotes()) || null;
  return (
    <main>
      <div className="w-full min-h-screen flex pt-20">
        <NoteAside initialNoteList={initialNoteList} />
        <NoteBlock />
      </div>
    </main>
  );
}
