const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/db');
const Product = require('./product');


class User extends Model {}

User.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	name: DataTypes.STRING,
	email: {
		allowNull:false,
		unique:true,
		type:DataTypes.STRING
	},
	password:{
		type: DataTypes.STRING,
		allowNull:false,
	},
	// token:{
	// 	type: DataTypes.STRING,
	// 	allowNull:false,
	// }
},{
	sequelize,
	tableName:'users',
	timestamps: true,
	createdAt: 'created_at',
  	updatedAt: 'updated_at'
});


User.hasMany(Product,{
	foreignKey:{
		name: 'user_id'
	}
});


module.exports = User;