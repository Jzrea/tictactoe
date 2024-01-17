const { createSchema } = require('./database/config.js');
const { sequelize: db } = require('./database/modelHandler.js');
const app = require('./server.js');

require("dotenv").config();


createSchema();
db.authenticate()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {

    });

