import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/database";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("rahasia", 10),
        name: "test",
        token: "test",
      },
    });
  }
}
