"use client";

import { useDebounce } from "../hooks/useDebounce";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { fetchToApi } from "@/lib/api/http-client";
import { PublicNote } from "@/domains/notes/types/note.types";
import { useEffect, useRef, useState } from "react";

export default function NoteEditor({ note }: { note: PublicNote }) {
  const [title, setTitle] = useState(note.name);
  const [text, setText] = useState(note.text);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedText = useDebounce(text, 1000);

  const updateNote = useNoteStore((state) => state.updateNote);

  const lastSaved = useRef({
    title: note.name,
    text: note.text,
  });

  useEffect(() => {
    const titleChanged = debouncedTitle !== lastSaved.current.title;
    const textChanged = debouncedText !== lastSaved.current.text;

    if (!titleChanged && !textChanged) return;

    const save = async () => {
      const payload: Partial<PublicNote> = {};

      if (titleChanged) payload.name = debouncedTitle;
      if (textChanged) payload.text = debouncedText;

      const res = await fetchToApi(`/api/notes/${note.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      if (!res.ok) return;

      updateNote(note.id, payload);

      lastSaved.current = {
        title: debouncedTitle,
        text: debouncedText,
      };
    };

    save();
  }, [debouncedTitle, debouncedText, note.id]);

  return (
    <div className="flex flex-col w-full h-full  p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none text-4xl font-bold mb-4 text-center"
      />

      <textarea
        className="w-full h-full border-none outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        autoFocus
      />
    </div>
  );
}
