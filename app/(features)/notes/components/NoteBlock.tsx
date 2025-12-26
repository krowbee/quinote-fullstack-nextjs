"use client";

import { useEffect, useRef, useState } from "react";
import { useNoteStore } from "@/app/_store/useNoteStore";
import NoteEditor from "./NoteEditor";
import NotePreview from "./NotePreview";
import { BlankNote } from "./BlankNote";

export default function NoteBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const choosedNote = useNoteStore((state) => state.choosedNote);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!choosedNote) return;
  });

  return (
    <div
      className="note-detail-container overflow-y-auto w-full px-7 pt-6 md:px-14 md:pt-14 bg-base-200 hide-scrollbar"
      onClick={() => setIsEditing(true)}
      ref={containerRef}
    >
      {choosedNote ? (
        isEditing ? (
          <NoteEditor key={choosedNote.id} note={choosedNote} />
        ) : (
          <NotePreview note={choosedNote} />
        )
      ) : (
        <BlankNote />
      )}
    </div>
  );
}
