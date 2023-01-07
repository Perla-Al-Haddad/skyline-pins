module.exports = (sequelize, Sequelize) => {
  const Pin = sequelize.define("pin", {
    id: {
      type: Sequelize.STRING
    },
    coords: {
      type: "Point"
    },
    message: {
      type: Sequelize.STRING
    },
    datecreated: {
      type: Sequelize.DATETIME
    }
  });

  return Pin;
};