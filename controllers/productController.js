const fs = require('fs')
const path = require('path')

const Product = require('../models/product')

const getProducts = async (req,res,next) => {
	let response = await Product.findAll();
	console.log(req.user_id);
	res.status(200).json({
		'products':response
	});
}

const storeProduct = async (req,res,next)=>{
	// console.log(req.user);
	let scode = 0;
	let message;
	try{
		if(!req.file){
			return res.status(422).json({
				'message' : 'Masukan Gambar'
			})	
		}

		let _name = req.body.name;
		let _img = req.file.path;
		let _price = req.body.price;
		let _stok = req.body.stok;
		let _description = req.body.description;
		if((isNaN(_price) || isNaN(_stok))){
			return res.json({
				'message' : 'tolong masukan angka'
			})
		}
		console.log(req.user_id);
		let response = await Product.create({
			user_id:req.user_id,
			name:_name,
			img:_img,
			price:_price,
			stok:_stok,
			description:_description
		});
		scode = 200;
		message = "success insert products";
	}catch(err){
		scode = 500
		message = err.toString();
	}
	// console.log(response);
	res.status(scode).json({
		'message':message
	});
}


const updateProduct = async (req,res,next) => {
		
		let _name = req.body.name;
		let _img = req.body.img;
		let _price = req.body.price;
		let _stok = req.body.stok;
		let _description = req.body.description;
		if(req.file){
			_img = req.file.path
		}

		if(!_img){
			return res.status(422).json({
				'message' : 'Masukan Gambarrr'
			})
		}

		if((isNaN(_price) || isNaN(_stok))){
			return res.json({
				'message' : 'tolong masukan angka'
			})
		}

			const product = await Product.findByPk(req.params.id);
			console.log(product);
			if(product == null){
				res.status(400).json({
					message:"Product not found"
				})
			}

			if(_img !== product.img){
				clearImage(product.img)	;
			}

			product.user_id = req.user_id
			product.name = _name
			product.img = _img
			product.price = _price
			product.stok = _stok
			product.description = _description
			product.save();

	res.status(200).json({
		'product' : product,
		'message':'Product berhasil di update'
	});	
}

const clearImage = filePath => {
	filePath = path.join(__dirname,"..",filePath);
	fs.unlink(filePath,err=>console.log(err));
}

module.exports = {
	getProducts,
	updateProduct,
	storeProduct
}