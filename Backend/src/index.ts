import express, { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import SwaggerOptions from "./utils/swagger";

const app : Express = express();
const port : number = 3000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.get("/", (req, res) => {
    return (res.status(200).json({ message: "Api is running" }));
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(SwaggerOptions)));
