"use client";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { PublicNote } from "@/domains/notes/types/note.types";
import { deleteNote, updateNote } from "../api/note.client.api";

export default function AsideDisplayNotes({
  title,
  notes,
  refreshNotes,
}: {
  title: string;
  notes: PublicNote[];
  refreshNotes: () => void;
}) {
  const setChoosedNote = useNoteStore((state) => state.setChoosedNote);
  const choosedNote = useNoteStore((state) => state.choosedNote);

  const handleDeleteNote = async (noteId: number) => {
    const result = await deleteNote(noteId);
    if (!result) return;

    if (choosedNote?.id === noteId) {
      setChoosedNote(null);
    }

    refreshNotes();
  };

  const handlePinNote = async (noteId: number, pinStatus: boolean) => {
    const result = await updateNote(noteId, { pinned: pinStatus });
    if (!result) return;
    refreshNotes();
  };

  return (
    <div className="notes-block flex flex-col justify-center items-center w-full gap-2 h-full">
      <h2 className="text-md">{title}</h2>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note w-full flex justify-between text-sm font-medium transition items-center hover:bg-base-300 shadow-sm px-2 ${
            choosedNote && choosedNote.id === note.id ? "bg-base-300" : ""
          } rounded-sm group`}
        >
          <h1
            className="cursor-pointer truncate max-w-[200px] flex items-center"
            onClick={() => setChoosedNote(note)}
          >
            {note.name}
          </h1>
          <div className="flex justify-between items-center gap-2 font-mono">
            <button
              className="text-sm opacity-0 transition-all ease cursor-pointer group-hover:opacity-100 "
              onClick={() => handleDeleteNote(note.id)}
            >
              🗑
            </button>

            <button
              className="text-2xl opacity-0 transition-all ease ease cursor-pointer group-hover:opacity-100"
              onClick={() => handlePinNote(note.id, !note.pinned)}
            >
              {note.pinned ? "☆" : "★"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
