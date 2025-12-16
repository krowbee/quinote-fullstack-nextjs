import { useNoteStore } from "@/app/_store/useNoteStore";
import { createNote } from "../services/note.client.service";

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
      <h2 className="text-md font-bold">New note</h2>
      <p
        className="font-bold cursor-pointer"
        onClick={() => handleCreateNote()}
      >
        ＋
      </p>
    </div>
  );
}
