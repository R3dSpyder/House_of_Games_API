const request = require("supertest");
const db = require("../db/connection.js").default;
const seed = require("../db/seeds/seed.js");
const { app } = require("../main_app");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => {
  return db.end();
});

///////////////////API GET CATEGORIES TASK3 //////////////////////////
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
});
////////////////////// API GET REVIEW OBJECT BY ID TASK4 //////////////////////////////

describe("/api/getReviewObjectById", () => {
  it("return a single entity in the form of an object", () => {
    return request(app)
      .get("/api/reviews/3")
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
        expect(body).hasOwnProperty("review_id");
        expect(body).hasOwnProperty("title");
        expect(body).hasOwnProperty("category");
        expect(body).hasOwnProperty("designer");
        expect(body).hasOwnProperty("owner");
        expect(body).hasOwnProperty("review_body");
        expect(body).hasOwnProperty("review_img_url");
        expect(body).hasOwnProperty("created_at");
        expect(body).hasOwnProperty("votes");
        expect(parseInt(body.review_id)).toBe(3);
      });
  });

  it("return an error if id is invalid", () => {
    return request(app)
      .get("/api/reviews/2000")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("that review ID is not found.");
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
});

////////////////////// PUT VOTES TO UPDATE REVIEW VOTES TASK5 //////////////////////////////

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
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("that review ID is not found.");
      });
  });

  it("returns an object with data if correct ID", () => {
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

////////////////////// GET USERS TASK6 //////////////////////////////

describe("/api/users get request", () => {
  it("returns an array of objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(Array.isArray(users) === true).toBe(true);
      });
  });

  it("returns an array of objects containing the properties requested (username, name, avatar_url)", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((user) => {
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("name");
          expect(user).toHaveProperty("avatar_url");
        });
      });
  });
});

////////////////////// COUNT COMMENTS TASK7 //////////////////////////////
describe("/api/reviews/:review_id get request", () => {
  it(" check the new review Object has a the new comment_count_key", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("comment_count");
      });
  });

  it(" check the new review Object has the CORRECT comment_count value for comments", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.comment_count).toBe("3");
      });
  });

  it(" check the new review Object still returns if there are no comments to add to it", () => {
    return request(app)
      .get("/api/reviews/5")
      .expect(200)
      .then(({ body }) => {
        const reference = {
          category: "social deduction",
          comment_count: "0",
          created_at: "2021-01-07T09:06:08.077Z",
          designer: "Seymour Buttz",
          owner: "mallionaire",
          review_body:
            "Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.",
          review_id: 5,
          review_img_url:
            "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
          title: "Proident tempor et.",
          votes: 5,
        };
        expect(body).toEqual(reference);
      });
  });
});

////////////////////// FETCH ALL REVIEWS TASK8 //////////////////////////////

describe("/api/reviews get request to get ALL review objects", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toEqual(true);
        expect(typeof body[0] === "object").toEqual(true);
      });
  });

  it("return empty array if no reviews", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toEqual(true);
        expect(typeof body[0] === "object").toEqual(true);
      });
  });

  it("each object returned has the requested keys", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).hasOwnProperty("review_id");
        expect(body.review).hasOwnProperty("title");
        expect(body.review).hasOwnProperty("category");
        expect(body.review).hasOwnProperty("designer");
        expect(body.review).hasOwnProperty("owner");
        expect(body.review).hasOwnProperty("review_body");
        expect(body.review).hasOwnProperty("review_img_url");
        expect(body.review).hasOwnProperty("created_at");
        expect(body.review).hasOwnProperty("votes");
        expect(body.review).hasOwnProperty("comment_count");
      });
  });
});

////////////////////// FETCH COMMENTS TASK9 //////////////////////////////

describe("/api/:review_id/comments get request for comments associated with review via review id", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toEqual(true);
        expect(typeof body[0] === "object").toEqual(true);
      });
  });

  it("ensure each object returned has the requested keys", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.forEach((item) => {
          expect(item.comments).hasOwnProperty("comment_id");
          expect(item.comments).hasOwnProperty("votes");
          expect(item.comments).hasOwnProperty("created_at");
          expect(item.comments).hasOwnProperty("author");
          expect(item.comments).hasOwnProperty("body");
          expect(item.comments).hasOwnProperty("review_id");
        });
      });
  });

  it("return an empty array if no comments", () => {
    return request(app)
      .get("/api/reviews/6/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });

  it("return an error if review ID is invalid", () => {
    return request(app)
      .get("/api/reviews/2666/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("that review ID is not found.");
      });
  });
});

////////////////////// POST COMMENT TASK10 //////////////////////////////

describe("/api/:review_id/comments POST request allows for comments to be created ", () => {
  const testPost = { username: "dav3rid", body: "This is the body for test" };
  const testPostError = { username: "John", body: "Fabulous" };

  it("return a comment object on posting", () => {
    return request(app)
      .post("/api/reviews/5/comments")
      .send(testPost)
      .expect(201)
      .then((body) => {
        expect(Array.isArray(body)).toBe(false);
        expect(typeof body === "object").toBe(true);
      });
  });

  it("returns a comment object with correct properties", () => {
    return request(app)
      .post("/api/reviews/5/comments")
      .send(testPost)
      .expect(201)
      .then(({ body }) => {
        expect(body.review).hasOwnProperty("comment_id");
        expect(body.review).hasOwnProperty("body");
        expect(body.review).hasOwnProperty("review_id");
        expect(body.review).hasOwnProperty("author");
        expect(body.review).hasOwnProperty("votes");
        expect(body.review).hasOwnProperty("created_at");
      });
  });

  it("returns with an object with the CORRECT values", () => {
    return request(app)
      .post("/api/reviews/5/comments")
      .send(testPost)
      .expect(201)
      .then(() => {
        return request(app)
          .get("/api/reviews/5/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body[0].body === testPost.body).toBe(true);
            expect(body[0].author === testPost.username).toBe(true);
          });
      });
  });

  it("returns with an error if asked to comment on invalid review", () => {
    return request(app)
      .post("/api/reviews/50/comments")
      .send(testPost)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("that review ID is not found.");
      });
  });

  it("returns an error if the author is not known", () => {
    return request(app)
      .post("/api/reviews/5/comments")
      .send(testPostError)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("user does not exist. Post aborted.");
      });
  });
});

////////////////////// ADDED ORDERING FOR GET REVIEWS TASK 11 //////////////////////////////

describe("/api/reviews GET request with queries allows for sorted return ", () => {
  it("allows for query to take place and doesn't return an error", () => {
    return request(app)
      .get(
        "/api/reviews?sort_by=created_at&order=ASC&category=social deduction"
      )
      .expect(200);
  });
});

it("allows for query to take place and returns a result correct results", () => {
  return request(app)
    .get("/api/reviews?sort_by=created_at&order=ASC&category=social deduction")
    .expect(200)
    .then(({ body }) => {
      body.forEach((entity) => {
        expect(entity.category).toBe("social deduction");
      });
    });
});

it("returns the results unsorted and unfiltered if query parameters are invalid", () => {
  return request(app)
    .get("/api/reviews?sort_by=created_at&order=ASC&category=social deduction")
    .expect(200)
    .then(({ body }) => {
      body.forEach((entity) => {
        expect(entity.category).toBe("social deduction");
      });
    });
});

////////////////////// DELETE COMMENTS //////////////////////////////

describe("/api/comments/:comment_id GET delete a comment ", () => {
  it("throws an error if the comment ID is invalid", () => {
    return request(app).delete("/api/comments/200").send().expect(400);
  });
  it("Allows deletion and returns status 200", () => {
    return request(app).delete("/api/comments/2").send().expect(200);
  });

  it("Correctly removes the comment", () => {
    return request(app)
      .delete("/api/comments/2")
      .send()
      .expect(200)
      .then(() => {});
  });
});

////////////////////// returns API //////////////////////////////

describe("/api returns a list of all end points and how to use them", () => {
  it("getsAPI", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ text }) => {
        return JSON.parse(text);
      })
      .then((data) => {
        console.log(data, "<<here");
      });
  });
});

////////////////////// returns user by USERNAME //////////////////////////////

describe("/api returns the details of a single user", () => {
  it("get a not found error with invalid username", () => {
    return request(app)
      .get("/api/users/tipToe")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(
          "Not found. No users by that name exist in the database."
        );
      });
  });

  it("get a 200 response with a valid username", () => {
    return request(app).get("/api/users/mallionaire").expect(200);
  });

  it("returns an object with a key of user", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then(({ body }) => {
        console.log(Object.keys(body));
        expect(Object.keys(body)[0]).toBe("user");
      });
  });

  it("returns correct user information", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then(({ body: { user } }) => {
        const userData = user[0];
        expect(userData.name).toBe("haz");
        expect(userData.avatar_url).toBe(
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
        );
      });
  });
});

////////////////////// PUT VOTES TO UPDATE COMMENT VOTES TASK5 //////////////////////////////

describe("/api/:comment_id put request to change the vote on a comment", () => {
  it("returns an error if body of request is wrong", () => {
    return request(app)
      .put("/api/comments/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request format to update vote");
      });
  });

  it("returns an error if the comment_id does not exist", () => {
    return request(app)
      .put("/api/comments/7")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("that review ID is not found.");
      });
  });

  it("returns an object with data if correct ID", () => {
    return request(app)
      .put("/api/comments/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(typeof body === "object").toEqual(true);
      });
  });

  it("returns an object with the updated vote changed (added) by 1 ", () => {
    return request(app)
      .put("/api/comments/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(17);
      });
  });

  it("returns an object with the updated vote changed (subtracting)by 1 ", () => {
    return request(app)
      .put("/api/comments/1")
      .send({ inc_votes: -1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(15);
      });
  });

  it("returns an object with the updated vote changed (adding) by 2 ", () => {
    return request(app)
      .put("/api/comments/1")
      .send({ inc_votes: 2 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(18);
      });
  });

  it("returns an object with the updated vote changed (subtracting) by 2 ", () => {
    return request(app)
      .put("/api/comments/1")
      .send({ inc_votes: -2 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(14);
      });
  });
});
