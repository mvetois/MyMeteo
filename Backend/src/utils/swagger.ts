import { Options } from "swagger-jsdoc";

const SwaggerOptions : Options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "MyMeteo API Documentation",
            version: "1.0.0",
            description: "This is a API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "mvetois",
                url: "https://mvetois.fr",
                email: "contact@mvetois.fr",
            },
        },
        servers: [
            {
                url: "http://localhost:5000/api/",
            },
        ]
    },
    apis: ["src/**/*.ts"],
    swagger: "2.0"
};

export default SwaggerOptions;