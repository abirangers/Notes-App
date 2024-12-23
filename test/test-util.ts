import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/database";
import supertest from "supertest";
import { web } from "../src/application/web";

export class UserTest {
  static async login() {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    return response.body?.data?.token;
  }

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

export class NoteTest {
  static async delete() {
    await prismaClient.note.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.note.create({
      data: {
        id: "1",
        title: "test",
        content: "test",
        username: "test",
      },
    });
  }
}
