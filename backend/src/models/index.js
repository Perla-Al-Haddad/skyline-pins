const Sequelize = require("sequelize");

const dbConfig = require("../config/db.config.js");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pins = require("./pin.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

//* Associations
db.users.hasMany(db.pins);

module.exports = db;