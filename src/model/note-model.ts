import { Note } from "@prisma/client";

export type NoteResponse = {
  id: string;
  title: string;
  content: string;
};

export type CreateNoteRequest = {
  title: string;
  content: string;
};

export type UpdateNoteRequest = {
  id: string;
  title: string;
  content: string;
};

export function toNoteResponse(note: Note): NoteResponse {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
  };
}
