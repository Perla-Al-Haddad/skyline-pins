module.exports = (sequelize, Sequelize) => {
  const Pin = sequelize.define("pin", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    // Not Null
    coords: {
      type: "Point"
    },
    // Not Null
    message: {
      type: Sequelize.STRING
    }
  });

  return Pin;
};