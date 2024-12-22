import { NextFunction, Request, Response } from "express";
import { CreateNoteRequest } from "../model/note-model";
import { NoteService } from "../service/note-service";
import { UserRequest } from "../type/user-request";

export class NoteController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateNoteRequest = req.body as CreateNoteRequest;
      const user = (req as UserRequest).user!;
      const response = await NoteService.create(user, request);
      res.status(200).json({
        data: response,
      });
    } catch (e: unknown) {
      next(e);
    }
  }
}
