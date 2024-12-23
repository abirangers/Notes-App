import { Note, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CreateNoteRequest,
  NoteResponse,
  toNoteResponse,
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
}
