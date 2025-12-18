import { noteService } from "@/domains/notes/services/note.service";
import { NextResponse } from "next/server";
import { getUser } from "../_helpers/getUser";
import { mapErrorToResponse } from "@/lib/http/errorMapper";

export async function GET() {
  try {
    const user = await getUser();
    const notes = await noteService.getUserNotes(user.id);
    return NextResponse.json({ notes });
  } catch (err) {
    return mapErrorToResponse(err);
  }
}

export async function POST() {
  try {
    const user = await getUser();

    const note = await noteService.createUserNote(user.id);
    return NextResponse.json(
      { message: "Note created successful", note },
      { status: 201 }
    );
  } catch (err) {
    return mapErrorToResponse(err);
  }
}
