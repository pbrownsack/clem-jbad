const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const sql = require("./mysql");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

require("dotenv").config();

/* MIDDLEWARE CONFIGRATION */

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'scatdadobapbedoop' }));
app.use(passport.initialize());
app.use(passport.session());

const v1Route = require("./routes/v1/index");
app.use("/v1", v1Route);

/* PASSPORT CONFIGURATION */

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.find(username);

        if (!user) {
            return done(null, false, { error: "User does not exist!" });
        }

        const verified = await User.verifyPassword(user.hash, password);

        if (!verified) {
            return done(null, false, { error: "Incorrect password!" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}))

/* LISTEN SERVER INIT */

app.listen(process.env.PORT_NO, () => {
    console.log("[CLEM] Process running on " + process.env.PORT_NO);
})

module.exports = app;