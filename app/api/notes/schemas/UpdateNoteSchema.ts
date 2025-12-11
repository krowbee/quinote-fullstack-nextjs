import z from "zod";

export const UpdateNoteSchema = z.object({
  name: z.string().optional(),
  text: z.string().optional(),
  pinned: z.boolean().optional(),
});
