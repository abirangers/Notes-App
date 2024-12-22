import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { NoteController } from "../controller/note-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.post("/api/notes", NoteController.create);
