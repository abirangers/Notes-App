import { NextFunction, Response } from "express";
import { CreateNoteRequest, UpdateNoteRequest } from "../model/note-model";
import { NoteService } from "../service/note-service";
import { UserRequest } from "../type/user-request";

export class NoteController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateNoteRequest = req.body as CreateNoteRequest;
      const response = await NoteService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e: unknown) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const noteId = req.params.noteId;
      const response = await NoteService.get(req.user!, noteId);
      res.status(200).json({
        data: response,
      });
    } catch (e: unknown) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateNoteRequest = req.body as UpdateNoteRequest;
      request.id = req.params.noteId;

      const response = await NoteService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e: unknown) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const noteId = req.params.noteId;
      await NoteService.delete(req.user!, noteId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e: unknown) {
      next(e);
    }
  }
}
