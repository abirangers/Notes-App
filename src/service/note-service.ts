import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  CreateNoteRequest,
  NoteResponse,
  toNoteResponse,
} from "../model/note-model";
import { NoteValidation } from "../validation/note-validation";
import { Validation } from "../validation/validation";

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
}
