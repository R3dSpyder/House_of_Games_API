const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const { app } = require("../main_app");
const destroy = require("../__helpers__/helpers.testing.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => {
  return db.end();
});

///////////////////API GET CATEGORIES//////////////////////////
describe("/api/getCategories", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
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

  it("error handling, expect 404 custom error if bad path", () => {
    return request(app)
      .get("/api/categories/funny")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Path Not Found. The correct path is /api/categories"
        );
      });
  });
});
////////////////////// API GET REVIEW OBJECT BY ID//////////////////////////////

describe("/api/getReviewObjectById", () => {
  it("return a sinlge entity in the form of an object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toEqual(false);
        expect(typeof body === "object").toEqual(true);
      });
  });

  it("return correct object given correct ID", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.category).toEqual(expect.any(String));
        expect(body.created_at).toEqual(expect.any(String));
        expect(body.designer).toEqual(expect.any(String));
        expect(body.owner).toEqual(expect.any(String));
        expect(body.review_body).toEqual(expect.any(String));
        expect(parseInt(body.review_id)).toBe(3);
        expect(body.review_img_url).toEqual(expect.any(String));
        expect(body.title).toEqual(expect.any(String));
      });
  });

  it("return an error if id out of bounds is used", () => {
    return request(app)
      .get("/api/reviews/2000")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request. ID out of bounds");
      });
  });
});
