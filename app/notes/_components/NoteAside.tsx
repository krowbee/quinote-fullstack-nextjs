"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AsideDisplayNotes from "./AsideDisplayNotes";
import { fetchToApi } from "@/lib/fetchToApis/fetchToApi";
import NewNote from "./NewNote";
import { PublicNote } from "@/lib/types/note.type";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { useAuthStore } from "@/app/_store/useAuthStore";

export default function NoteAside({
  initialNoteList,
}: {
  initialNoteList: PublicNote[] | null;
}) {
  const user = useAuthStore((state) => state.user);
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);

  const updateNotes = useCallback(async () => {
    const res = await fetchToApi("/api/notes", { method: "GET" });
    if (!res.ok) return;
    const json = await res.json();
    setNotes(json.notes);
  }, [setNotes]);

  useEffect(() => {
    if (initialNoteList === null) {
      const load = async () => await updateNotes();
      load();
      return;
    }
    setNotes(initialNoteList);
  }, [initialNoteList, updateNotes]);

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
      <NewNote updateNotes={updateNotes} />
      <div className="w-full flex flex-col gap-4 items-center">
        <>
          <AsideDisplayNotes
            title="Pinned"
            updateNotes={updateNotes}
            notes={pinnedNotes}
          />
          <AsideDisplayNotes
            title="Notes"
            updateNotes={updateNotes}
            notes={regularNotes}
          />
        </>
      </div>
    </aside>
  );
}
