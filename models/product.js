const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/db');


class Product extends Model{}

Product.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	name: DataTypes.STRING,
	img: {
		allowNull:false,
		type:DataTypes.STRING
	},
	price:{
		type: DataTypes.DOUBLE,
		allowNull:false,
	},
	stok:{
		type: DataTypes.INTEGER,
		allowNull:false,
	},
	description:{
		type: DataTypes.STRING,
		allowNull:false,
	}
},{
	sequelize,
	tableName: 'products',
	timestamps: false
});

module.exports = Product;