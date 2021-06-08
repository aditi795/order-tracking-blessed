const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("./_key.js");
const genToken = require('../passport');

const User = sequelize.define(
  "user",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
      primaryKey: true
    },
    user_password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    user_role: {
      type: DataTypes.ENUM("csr"),
      allowNull: false,
    },
  },

  {
    timestamps:false,
  }
  
);

module.exports.authenticateUser = async (email, password) =>{
    user = await User.findOne({where: {email: email}});
    //console.log(user);
    //console.log(password);
    if(user.dataValues.user_password === password){
      return user.dataValues;
    }
    else{
      throw("error");
    };
}
    
  