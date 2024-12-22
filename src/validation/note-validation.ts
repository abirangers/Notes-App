import { z, ZodType } from "zod";

export class NoteValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1),
  });
}
