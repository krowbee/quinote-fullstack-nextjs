import { Note } from "@prisma/client";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../../../lib/exceptions/httpExceptions/httpExceptions";
import { prisma } from "../../../lib/prisma/prisma";
import { PublicNote } from "../types/note.types";

class NoteService {
  async getNoteById(userId: number, noteId: number): Promise<PublicNote> {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new BadRequestException("Incorrect note id");
    if (note.ownerId !== userId)
      throw new UnauthorizedException("You haven't access to this resource");
    return {
      id: note.id,
      name: note.name,
      text: note.name,
      pinned: note.pinned,
      updatedAt: note.updatedAt,
      createdAt: note.createdAt,
    };
  }

  async getUserNotes(userId: number): Promise<PublicNote[]> {
    if (!userId) throw new BadRequestException("Invalid user id");
    return prisma.note.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        text: true,
        pinned: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async createUserNote(userId: number): Promise<PublicNote> {
    if (!userId) throw new BadRequestException("Invalid request data");

    return prisma.note.create({
      data: {
        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
        text: true,
        pinned: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async updateUserNote(
    userId: number,
    noteId: number,
    updateData: { name?: string; text?: string; pinned?: boolean }
  ): Promise<PublicNote> {
    const haveAccess = await prisma.note.findFirst({
      where: { id: noteId, ownerId: userId },
    });
    if (!haveAccess) throw new NotFoundException("Resource not found");

    return prisma.note.update({
      where: { id: noteId },
      data: {
        name: updateData.name,
        text: updateData.text,
        pinned: updateData.pinned,
      },
      select: {
        id: true,
        name: true,
        text: true,
        pinned: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  async deleteUserNote(userId: number, noteId: number): Promise<Note> {
    const haveAccess = await prisma.note.findFirst({
      where: { id: noteId, ownerId: userId },
    });
    if (!haveAccess) throw new NotFoundException("Resource not found");
    return prisma.note.delete({ where: { id: noteId } });
  }
}

export const noteService = new NoteService();
