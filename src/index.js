require("dotenv").config();
const mongodb = require("./models/database");

const app = require("./server");
const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log("Webserver is listening to port: " + port);
        });
    }
});


