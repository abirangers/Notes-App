import { ZodType } from "zod";

export class Validation {
  static validate<T>(schema: ZodType, request: T): T {
    const result = schema.safeParse(request);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
}
