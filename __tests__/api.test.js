const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const { app } = require("../main_app");
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
        expect(body.msg).toBe("Path Not Found.");
      });
  });
});
////////////////////// API GET REVIEW OBJECT BY ID//////////////////////////////

describe("/api/getReviewObjectById", () => {
  it("return a single entity in the form of an object", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toEqual(false);
        expect(typeof body === "object").toEqual(true);
      });
  });

  it("return correct object given correct ID", () => {
    const referenceObject = {
      review_id: 3,
      title: "Ultimate Werewolf",
      category: "social deduction",
      designer: "Akihisa Okui",
      owner: "bainesface",
      review_body: "We couldn't find the werewolf!",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 5,
    };
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(referenceObject);
      });
  });

  it("return an error if id is invalid", () => {
    return request(app)
      .get("/api/reviews/2000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID out of range");
      });
  });

  it("return an error if id is of an incorrect type", () => {
    return request(app)
      .get("/api/reviews/notANumber")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Not Found. You need to specify a valid integer ID in format api/review/<integer_id>"
        );
      });
  });

  it("return an error if someone entered an additional path", () => {
    return request(app)
      .get("/api/reviews/6/top_marks/")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found. That path has not been found.");
      });
  });
});

////////////////////// PUT VOTES //////////////////////////////

describe("/api/:review_id put request to change the vote on a comment", () => {
  it("returns an error if nothing passed to the post request", () => {
    return request(app)
      .put("/api/reviews/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request format to update vote");
      });
  });

  it("returns an error if id does not exist", () => {
    return request(app)
      .put("/api/reviews/100")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID out of range");
      });
  });

  it("returns an object of some type if passed an object", () => {
    return request(app)
      .put("/api/reviews/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(typeof body === "object").toEqual(true);
      });
  });

  it("returns an object with the updated vote changed by 1 ", () => {
    return request(app)
      .put("/api/reviews/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(2);
      });
  });

  it("returns an object with the updated vote changed by 2 ", () => {
    return request(app)
      .put("/api/reviews/1")
      .send({ inc_votes: 2 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(3);
      });
  });
});
