require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    next();

});

app.use("/", routes);

app.use((err, req, res, next) => {

    if (res.status === 401)
        res.json({message: "Not Unauthorized. Log in."});
    
    res.status(err.status || 500).json({message: "An error occured."});
});


process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


module.exports = app;