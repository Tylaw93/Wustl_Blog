// 6 Import sequelize, bcrypt, and import config/connection
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// 7 Create User Model and when it is created, hook the password
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// 8 Create initialize user Model and insert column attributes
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
// 9 create a hook to encrypt the user's password  (See ./Post.js)
  {
    hooks: {
      beforeCreate: async (createInfo) => {
        createInfo.password = await bcrypt.hash(createInfo.password, 10);
        return createInfo;
      },
      beforeUpdate: async (updateInfo) => {
        updateInfo.password = await bcrypt.hash(updateInfo.password, 10);
        return updateInfo;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;