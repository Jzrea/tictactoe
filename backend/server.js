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
app.use("/api/session", require("./routes/sessions.routes.js"));
// app.get('/api', (req, res) => res.send("api"));
// app.get('/', (req, res) => res.send("Server's up"));
// #endregion
// FOR MONOREPO DEPLOYMENT
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// } else {
//     app.use("*", (req, res) => { res.status(404).json({ error: "access" }); });
// }

app.use(errorHandler);

module.exports = app;
