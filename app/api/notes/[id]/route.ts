import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../_helpers/getUser";
import { noteService } from "@/domains/notes/services/note.service";
import { UpdateNoteSchema } from "../schemas/UpdateNoteSchema";
import { mapErrorToResponse } from "@/lib/http/errorMapper";
import { InvalidBodyDataError } from "../../../../lib/http/errors/http.errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = Number(id);
    const user = await getUser();
    const note = await noteService.getNoteById(user.id, noteId);
    return NextResponse.json({ note }, { status: 200 });
  } catch (err) {
    return mapErrorToResponse(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = Number(id);

    const user = await getUser();

    const data = await req.json();
    const isValid = UpdateNoteSchema.safeParse(data);

    if (!isValid.success) throw new InvalidBodyDataError();
    const validData = UpdateNoteSchema.parse(data);
    const updatedNote = await noteService.updateUserNote(
      user.id,
      noteId,
      validData
    );
    return NextResponse.json(
      { messsage: "Updated note succesful", note: updatedNote },
      { status: 200 }
    );
  } catch (err) {
    return mapErrorToResponse(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = Number(id);
    if (isNaN(noteId)) throw new InvalidBodyDataError();
    const user = await getUser();
    const deleteNote = await noteService.deleteUserNote(user.id, noteId);
    return NextResponse.json(
      { message: "Note deleted succesful", note: deleteNote },
      { status: 200 }
    );
  } catch (err) {
    return mapErrorToResponse(err);
  }
}
