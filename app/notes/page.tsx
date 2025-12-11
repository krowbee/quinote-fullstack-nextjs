import NoteAside from "./_components/NoteAside";
import NoteBlock from "./_components/NoteBlock";
import { PublicNote } from "@/lib/types/note.type";
import { serverFetchToApi } from "@/lib/fetchToApis/serverFetchToApi";

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
