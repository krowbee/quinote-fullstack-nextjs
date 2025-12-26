"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import AsideDisplayNotes from "./AsideDisplayNotes";
import NewNote from "./NewNote";
import { PublicNote } from "@/domains/notes/types/note.types";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { useAuthStore } from "@/app/_store/useAuthStore";
import { fetchNotes } from "../api/note.client.api";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export default function NoteAside({
  initialNoteList,
}: {
  initialNoteList: PublicNote[] | null;
}) {
  const user = useAuthStore((state) => state.user);
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);

  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <aside
        className={`${
          !isOpen && isMobile ? "-translate-x-full" : "translate-x-0"
        }  flex flex-col items-center gap-6 ${
          isMobile &&
          "fixed z-50 h-full transition-transform transform ease-out border-primary border-t-1 border-r-1"
        } bg-white overflow-y-auto hide-scrollbar shadow-sm sm:w-min z-1 md:w-[300px] p-4`}
      >
        <div className="profile-block w-full flex flex-col items-center  justify-center p-4">
          <h2 className="text-md">You working as:</h2>
          <p className="text-md font-medium text-primary">{user?.email}</p>
        </div>
        <NewNote refreshNotes={refreshNotes} />
        <div className="w-full flex flex-col gap-4 items-center">
          <>
            {pinnedNotes.length !== 0 ? (
              <AsideDisplayNotes
                title="Pinned"
                refreshNotes={refreshNotes}
                notes={pinnedNotes}
              />
            ) : null}
            <AsideDisplayNotes
              title="Notes"
              refreshNotes={refreshNotes}
              notes={regularNotes}
            />
          </>
        </div>
      </aside>

      {isMobile && (
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className={`fixed top-50 ${
            isOpen ? "translate-x-52" : "-translate-x-2"
          } z-49 btn btn-xs h-9 btn-primary rounded-r-2xl flex-col transition-transform transform ease-out`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`h-1 w-4 bg-white transition ease-in-out ${
              isOpen && "rotate-45 translate-y-[5px]"
            }`}
          ></div>
          <div
            className={`h-1 w-4 bg-white transition ease-in-out ${
              isOpen && "opacity-0 absolute"
            }`}
          ></div>
          <div
            className={`h-1 w-4 bg-white transition ease-in-out ${
              isOpen && "rotate-[-45deg] translate-y-[-5px]"
            }`}
          ></div>
        </button>
      )}
    </>
  );
}
