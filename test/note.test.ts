import supertest from "supertest";
import { web } from "../src/application/web";
import { UserTest } from "./test-util";
import { NoteTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/notes", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await NoteTest.delete();
    await UserTest.delete();
  });

  it("should be able to create note", async () => {
    const loginResponse = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    const token = loginResponse.body?.data?.token;

    const request = {
      title: "testTitle",
      content: "testContent",
    };

    const response = await supertest(web)
      .post("/api/notes")
      .set("X-API-TOKEN", token)
      .send(request);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe(request.title);
    expect(response.body.data.content).toBe(request.content);
  });
});

describe("GET /api/notes/:noteId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await NoteTest.create();
  });

  afterEach(async () => {
    await NoteTest.delete();
    await UserTest.delete();
  });

  it("should be able to get note", async () => {
    const loginResponse = await UserTest.login();

    const response = await supertest(web)
      .get(`/api/notes/1`)
      .set("X-API-TOKEN", loginResponse);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe("1");
    expect(response.body.data.title).toBe("test");
    expect(response.body.data.content).toBe("test");
  });

  it("should reject if note not found", async () => {
    const loginResponse = await UserTest.login();

    const response = await supertest(web)
      .get(`/api/notes/2`)
      .set("X-API-TOKEN", loginResponse);

    logger.debug(response);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe("Note not found");
  });
});
