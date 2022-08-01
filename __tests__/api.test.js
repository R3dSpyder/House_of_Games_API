const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const { server, app } = require("../main_app");
const destroy = require("../__helpers__/helpers.testing.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => {
  destroy(server);
  console.log("..::Tests completed. Server now offline again::..");
});

describe("/api/getCategories", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(Array.isArray(body)).toEqual(true);
        expect(typeof body[0] === "object").toEqual(true);
      });
  });

  it("expect each object to be length 2 values", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.forEach((member) => {
          expect(Object.keys(member).length === 2).toBe(true);
        });
      });
  });

  it("each object returned has the properties 'slug' and 'description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.forEach((member) => {
          expect(
            member.hasOwnProperty("slug") &&
              member.hasOwnProperty("description") === true
          ).toBe(true);
        });
      });
  });

  it("expect each property to have a data type of string", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.forEach((member) => {
          expect(
            typeof member.slug && typeof member.description === "string"
          ).toBe(true);
        });
      });
  });
});
