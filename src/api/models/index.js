const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const basename = path.basename(__filename);
const db = {};

console.log("Username:",process.env.DB_USERNAME, "Password:",process.env.DB_PASSWORD)

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

function readRecursive(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      readRecursive(fullPath);
    } else if (file.endsWith(".js") && file !== basename) {
      const model = require(fullPath)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });
}

readRecursive(__dirname);

Object.values(db)
  .filter((model) => model.associate)
  .forEach((model) => model.associate(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
