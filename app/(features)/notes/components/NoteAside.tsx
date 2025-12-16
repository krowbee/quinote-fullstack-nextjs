"use client";
import { useCallback, useEffect, useMemo } from "react";
import AsideDisplayNotes from "./AsideDisplayNotes";
import NewNote from "./NewNote";
import { PublicNote } from "@/domains/notes/types/note.types";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { useAuthStore } from "@/app/_store/useAuthStore";
import { fetchNotes } from "../api/note.client.api";

export default function NoteAside({
  initialNoteList,
}: {
  initialNoteList: PublicNote[] | null;
}) {
  const user = useAuthStore((state) => state.user);
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);

  const refreshNotes = useCallback(async () => {
    const notes = await fetchNotes();
    setNotes(notes);
  }, [setNotes]);

  useEffect(() => {
    if (initialNoteList === null) {
      refreshNotes();
      return;
    }
    setNotes(initialNoteList);
  }, [initialNoteList, refreshNotes, setNotes]);

  const { pinnedNotes, regularNotes } = useMemo(() => {
    const pinned: PublicNote[] = [];
    const regular: PublicNote[] = [];

    for (const note of notes) {
      (note.pinned ? pinned : regular).push(note);
    }

    const sort = (arr: PublicNote[]) => {
      arr.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      return arr;
    };

    return { regularNotes: sort(regular), pinnedNotes: sort(pinned) };
  }, [notes]);

  return (
    <aside className="flex flex-col items-center gap-6  overflow-y-auto shadow-sm w-[300px] p-4">
      <div className="profile-block w-full flex flex-col items-center  justify-center p-4">
        <h2 className="text-md">You working as:</h2>
        <p className="text-md font-medium text-primary">{user?.email}</p>
      </div>
      <NewNote refreshNotes={refreshNotes} />
      <div className="w-full flex flex-col gap-4 items-center">
        <>
          <AsideDisplayNotes
            title="Pinned"
            refreshNotes={refreshNotes}
            notes={pinnedNotes}
          />
          <AsideDisplayNotes
            title="Notes"
            refreshNotes={refreshNotes}
            notes={regularNotes}
          />
        </>
      </div>
    </aside>
  );
}
