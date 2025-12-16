import { useNoteStore } from "@/app/_store/useNoteStore";
import { fetchToApi } from "@/lib/api/http-client";

export default function NewNote({ updateNotes }: { updateNotes: () => void }) {
  const setChoosedNote = useNoteStore((state) => state.setChoosedNote);

  const handleCreateNote = async () => {
    const res = await fetchToApi("/api/notes", {
      method: "POST",
    });

    if (!res.ok) return;

    const json = await res.json();
    setChoosedNote(json.note);

    await updateNotes();
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
