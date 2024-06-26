require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const passport = require("passport");
const routes = require("./routes");
const db = require("./models");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./services/swagger");

const { mockData } = require("./config/initiateDbData");
const { mockProfileData } = require("./config/initiateProfileData");

const app = express();

const allowedOrigins = [
  "https://escort-near-you.vercel.app",
  "https://x-project-design-system.vercel.app",
  "https://x-project-design-system-git-localization-hashen.vercel.app",
  "http://localhost:3000",
];

app.set("trust proxy", true);

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(helmet.contentSecurityPolicy());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10000,
  keyGenerator: (req) => {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  },
});

app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", routes.auth);
app.use("/appointments", routes.appointment);
app.use("/ticket", routes.ticket);
app.use("/chat", routes.chat);
app.use("/escort", routes.escort);
app.use("/member", routes.member);
app.use("/profile", routes.profile);
app.use("/form", routes.form);
app.use("/payment", routes.payment);
app.use("/language", routes.language);
app.use("/admin", routes.admin);
app.use("/search", routes.mainSearch);
app.use("/affiliate", routes.affiliate);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.post("/mockData", mockData);
app.post("/mockProfileData", mockProfileData);
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 3001}`);
  });
});

module.exports = app;
