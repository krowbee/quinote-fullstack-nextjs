import { PublicNote } from "@/domains/notes/types/note.types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function NotePreview({ note }: { note: PublicNote }) {
  return (
    <div className="prose max-w-none text-base leading-7 break-words prose-p:my-0 overflow-y-auto hide-scrollbar">
      <h2 className="w-full text-4xl font-bold text-center mb-4">
        {note.name}
      </h2>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {note.text}
      </ReactMarkdown>
    </div>
  );
}
