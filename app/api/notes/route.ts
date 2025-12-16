import { HttpException } from "@/lib/exceptions/HttpException";
import { noteService } from "@/domains/notes/services/note.service";
import { NextResponse } from "next/server";
import { getUser } from "../_helpers/getUser";

export async function GET() {
  try {
    const user = await getUser();
    const notes = await noteService.getUserNotes(user.id);
    return NextResponse.json({ notes });
  } catch (err) {
    if (err instanceof HttpException) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
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
    console.log(err);
    if (err instanceof HttpException) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
