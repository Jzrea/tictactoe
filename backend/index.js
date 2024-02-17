const app = require('./server.js');
const mongoose = require("mongoose");
require("dotenv").config();



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server up`);
});
console.log("connecting to database...");

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log("database connected.");
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = app;