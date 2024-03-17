import request from "supertest";
import app from "./src/app";

describe("GET /properties", () => {
  it("responds with status:200 and a list of properties", async () => {
    const response = await request(app).get("/properties");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(4);
  });
});

describe("POST /properties", () => {
  it("status:201 new property is added to list of properties", async () => {
    const newProperty = {
      id: 2,
      address: "new address",
      price: 500,
      rating: 3,
      image: "url",
    };
    const response = await request(app).post("/properties").send(newProperty);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newProperty);
  });
  it("returns 400 Bad Request when required field is the wrong type", async () => {
    const malformedProperty = {
      id: 3,
      address: "new address",
      price: "should_be_number",
      rating: 3,
      image: "url",
    };

    const response = await request(app)
      .post("/properties")
      .send(malformedProperty);

    expect(response.statusCode).toBe(400);
  });
});
