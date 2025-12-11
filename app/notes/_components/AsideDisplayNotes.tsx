"use client";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { fetchToApi } from "@/lib/fetchToApis/fetchToApi";
import { PublicNote } from "@/lib/types/note.type";

export default function AsideDisplayNotes({
  title,
  notes,
  updateNotes,
}: {
  title: string;
  notes: PublicNote[];
  updateNotes: () => void;
}) {
  const setChoosedNote = useNoteStore((state) => state.setChoosedNote);
  const choosedNote = useNoteStore((state) => state.choosedNote);

  const handleDeleteNote = async (noteId: number) => {
    const res = await fetchToApi(`/api/notes/${noteId}`, { method: "DELETE" });
    if (!res.ok) return;
    if (choosedNote?.id === noteId) {
      setChoosedNote(null);
    }
    await updateNotes();
  };

  const handlePinNote = async (noteId: number, pinStatus: boolean) => {
    const res = await fetchToApi(`/api/notes/${noteId}`, {
      method: "PATCH",
      body: JSON.stringify({
        pinned: pinStatus,
      }),
    });
    if (!res.ok) return;
    await updateNotes();
  };

  return (
    <div className="notes-block flex flex-col justify-center items-center w-full gap-2 h-full min-h-20">
      <h2 className="text-lg font-bold">{title}</h2>
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
