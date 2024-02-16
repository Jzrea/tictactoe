const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error-middleware.js");

const app = express();
app.use(express.json());
app.use(cors({ origin: `*` }));
// app.options('https://localhost:5173', cors());
app.use(express.urlencoded({ extended: true }));


// #region ROUTES
if (process.env.NODE_ENV != "production") {
    app.get('/', (req, res) => res.json({
        DEBUGtest: true
    }));
    app.get('/api', (req, res) => res.json({
        DEBUGtest: true
    }));
}
// app.use("/api/sessions", require("./routes/sessions.routes.js"));
// #endregion

app.use(errorHandler);

module.exports = app;
