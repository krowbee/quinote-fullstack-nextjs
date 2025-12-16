"use client";

import { useEffect, useRef, useState } from "react";
import { useNoteStore } from "@/app/_store/useNoteStore";
import NoteEditor from "./NoteEditor";
import NotePreview from "./NotePreview";

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
      className="note-detail-container overflow-y-auto w-full p-6 bg-base-300 hide-scrollbar"
      onClick={() => setIsEditing(true)}
      ref={containerRef}
    >
      {choosedNote ? (
        isEditing ? (
          <NoteEditor key={choosedNote.id} note={choosedNote} />
        ) : (
          <NotePreview note={choosedNote} />
        )
      ) : null}
    </div>
  );
}
