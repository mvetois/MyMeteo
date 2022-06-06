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