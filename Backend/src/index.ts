import express, { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import SwaggerOptions from "./utils/swagger";
import API from "./routes/index";

const app : Express = express();
const port : number = 5000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(SwaggerOptions)));

app.use("/api", API);

export default app;