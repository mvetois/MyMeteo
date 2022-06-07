import express, { Express, Request, Response, NextFunction } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import SwaggerOptions from "./utils/swagger";
import API from "./routes/index";

import initDb from "./utils/initDb";

const app : Express = express();
const port : number = 5000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

initDb();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Methods", "GET,POST");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(SwaggerOptions)));

app.use("/api", API);

export default app;