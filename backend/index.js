const app = require('./server.js');
const mongoose = require("mongoose");
require("dotenv").config();


console.log("connecting to database...");
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("database connected.");
    })
    .catch((err) => {
        console.error(err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;