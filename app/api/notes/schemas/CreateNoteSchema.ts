import z from "zod";

export const CreateNoteSchema = z.object({
  name: z.string().optional(),
  text: z.string().optional(),
  pinned: z.boolean().optional(),
});
