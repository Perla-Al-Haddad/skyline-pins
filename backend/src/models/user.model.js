const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, 'a');
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      },
      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        }
      }
    });

  return User;
}


/**
 *? https://plainenglish.io/blog/password-encryption-using-bcrypt-sequelize-and-nodejs-fb9198634ee7
 *? VALIDATE PASSWORD
 * const authenticateUserWithemail = (user) => {
 return new Promise((resolve, reject) => {
  try {
   usermodel.findOne({
   where: {
    user_email: user.userName // user email
   }
   }).then(async (response) => {
    if (!response) {
     resolve(false);
    } else {
      if (!response.dataValues.password ||
       !await response.validPassword(user.password,
        response.dataValues.password)) {
         resolve(false);
      } else {
       resolve(response.dataValues)
      }
     }
    })
   } catch (error) {
   const response = {
    status: 500,
    data: {},
   error: {
    message: "user match failed"
   }
   };
  reject(response);
  }
 })
} */