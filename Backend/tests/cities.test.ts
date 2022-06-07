import supertest from "supertest";
import { expect } from "chai";
import { describe, it } from "mocha";

import app from "../src/index";

describe("POST - Load cities to DB", () => {
    it("Cities is loading", async () => {
        const response : any = await supertest(app).post("/api/cities/load");

        expect(response.status).to.equal(200);
    });
});

describe("GET - Find cities with name or postal code", () => {
    it("Error when you don't enter a param", async () => {
        const response : any = await supertest(app).get("/api/cities/find");

        expect(response.status).to.equal(400);
    });
    it("Error when you don't enter an undefined digit param", async () => {
        const response : any = await supertest(app).get("/api/cities/find?param='1234");

        expect(response.status).to.equal(400);
    });
    it("Error when you don't enter an undefined text param", async () => {
        const response : any = await supertest(app).get("/api/cities/find?param='AZERTY");

        expect(response.status).to.equal(400);
    });
    it("Sucess when you enter a valid postal code", async () => {
        const response : any = await supertest(app).get("/api/cities/find?param='67000");

        expect(response.status).to.equal(400);
    });
    it("Sucess when you enter a valid city name", async () => {
        const response : any = await supertest(app).get("/api/cities/find?param='strasbourg");

        expect(response.status).to.equal(400);
    });
});