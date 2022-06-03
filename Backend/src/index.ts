import express, { Express } from "express";

const app : Express = express();
const port : number = 3000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.get("/", (req, res) => {
    return (res.status(200).json({ message: "Api is running" }));
});