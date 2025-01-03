import { Note, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CreateNoteRequest,
  NoteResponse,
  toNoteResponse,
  UpdateNoteRequest,
} from "../model/note-model";
import { NoteValidation } from "../validation/note-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";

export class NoteService {
  static async create(
    user: User,
    request: CreateNoteRequest
  ): Promise<NoteResponse> {
    const createRequest = Validation.validate(NoteValidation.CREATE, request);

    const record = {
      ...createRequest,
      username: user.username,
    };

    const note = await prismaClient.note.create({
      data: record,
    });

    return toNoteResponse(note);
  }

  static async checkNoteMustExists(user: User, noteId: string): Promise<Note> {
    const note = await prismaClient.note.findFirst({
      where: {
        username: user.username,
        id: noteId,
      },
    });

    if (!note) {
      throw new ResponseError(404, "Note not found");
    }

    return note;
  }

  static async get(user: User, noteId: string): Promise<NoteResponse> {
    const note = await this.checkNoteMustExists(user, noteId);
    return toNoteResponse(note);
  }

  static async update(
    user: User,
    request: UpdateNoteRequest
  ): Promise<NoteResponse> {
    const updateRequest = Validation.validate(NoteValidation.UPDATE, request);
    await this.checkNoteMustExists(user, updateRequest.id);

    const note = await prismaClient.note.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toNoteResponse(note);
  }

  static async delete(user: User, noteId: string): Promise<NoteResponse> {
    await this.checkNoteMustExists(user, noteId);

    const note = await prismaClient.note.delete({
      where: {
        id: noteId,
        username: user.username,
      },
    });

    return toNoteResponse(note);
  }
}
