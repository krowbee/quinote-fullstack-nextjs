"use client";

import { useDebounce } from "../hooks/useDebounce";
import { useNoteStore } from "@/app/_store/useNoteStore";
import { PublicNote } from "@/domains/notes/types/note.types";
import { useEffect, useRef, useState } from "react";
import { updateNote } from "../api/note.client.api";
import { UpdateNoteDto } from "../dto/notes.dto";

export default function NoteEditor({ note }: { note: PublicNote }) {
  const [title, setTitle] = useState(note.name);
  const [text, setText] = useState(note.text);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedText = useDebounce(text, 1000);

  const updateLocalNote = useNoteStore((state) => state.updateLocalNote);

  const lastSaved = useRef({
    title: note.name,
    text: note.text,
  });

  useEffect(() => {
    const titleChanged = debouncedTitle !== lastSaved.current.title;
    const textChanged = debouncedText !== lastSaved.current.text;

    if (!titleChanged && !textChanged) return;

    const save = async () => {
      const payload: UpdateNoteDto = {};

      if (titleChanged) payload.name = debouncedTitle;
      if (textChanged) payload.text = debouncedText;

      const result = await updateNote(note.id, payload);

      if (!result) return;

      updateLocalNote(note.id, payload);

      lastSaved.current = {
        title: debouncedTitle,
        text: debouncedText,
      };
    };

    save();
  }, [debouncedTitle, debouncedText, note.id, updateLocalNote]);

  return (
    <div className="flex flex-col w-full h-full">
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
