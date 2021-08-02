const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const v1Route = require("./routes/v1/index");
app.use("/v1", v1Route);

app.listen(process.env.PORT_NO, () => {
    console.log("[CLEM] Process running on " + process.env.PORT_NO);
})

module.exports = app;