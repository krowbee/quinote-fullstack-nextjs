import { useNoteStore } from "@/app/_store/useNoteStore";
import { createNote } from "../api/note.client.api";

export default function NewNote({
  refreshNotes,
}: {
  refreshNotes: () => void;
}) {
  const setChoosedNote = useNoteStore((state) => state.setChoosedNote);

  const handleCreateNote = async () => {
    const note = await createNote();
    if (!note) return;
    setChoosedNote(note);

    refreshNotes();
  };

  return (
    <div className="justify-center items-center flex flex-col gap-4">
      <p
        className="font-bold cursor-pointer"
        onClick={() => handleCreateNote()}
      >
        ＋
      </p>
    </div>
  );
}
