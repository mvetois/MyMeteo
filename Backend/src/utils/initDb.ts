import mongoose from "mongoose";

const initDb = () : void => {
    mongoose.connect("mongodb://localhost:27017", {user: "admin", pass: "password", dbName: "project"})
        .then(() => { console.log("MongoDB connected !") })
        .catch((err) => { console.log(err.message) });

    mongoose.connection.on("connected", () => {
        console.log("API sucessfully connected to MongoDB !");
    });

    mongoose.connection.on("error", (err) => {
        console.error(err.message);
        process.exit(84);
    });
};

export default initDb;