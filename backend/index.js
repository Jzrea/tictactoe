const app = require('./server.js');
const mongoose = require("mongoose");
require("dotenv").config();


app.listen(port, () => {
    console.debug(`Server started on port ${port}`);
});
console.debug("connecting to database...");
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.debug("database connected.");
        const port = process.env.PORT || 3000;
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = app;