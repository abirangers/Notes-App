import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { NoteController } from "../controller/note-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.post("/api/notes", NoteController.create);
apiRouter.get("/api/notes/:noteId", NoteController.get);
apiRouter.put("/api/notes/:noteId", NoteController.update);
apiRouter.delete("/api/notes/:noteId", NoteController.delete);
