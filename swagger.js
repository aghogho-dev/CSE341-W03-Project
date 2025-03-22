const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        "title": "Customer Transaction API Documentation",
        "description": "A simple CRUD web services for managing customers' accounts and transactions",
        "version": "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);