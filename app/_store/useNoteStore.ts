"use client";

import { create } from "zustand";

import { PublicNote } from "@/domains/notes/types/note.types";

interface NoteStore {
  notes: PublicNote[];
  setNotes: (notes: PublicNote[]) => void;
  choosedNote: PublicNote | null;
  setChoosedNote: (note: PublicNote | null) => void;
  updateNote: (id: number, data: Partial<PublicNote>) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  choosedNote: null,
  setChoosedNote: (note) => set({ choosedNote: note }),
  setNotes: (notes) => set({ notes }),
  updateNote: (id, data) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...data } : note
      ),

      choosedNote:
        state.choosedNote?.id === id
          ? { ...state.choosedNote, ...data }
          : state.choosedNote,
    })),
}));
