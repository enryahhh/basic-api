const Product = require('../models/product')

const getProducts = async (req,res,next) => {
	let response = await Product.findAll();
	console.log(response);
	res.status(200).json({
		'message':'index products'
	});
}


const storeProduct = async (req,res,next)=>{
	// console.log(req.user);
	let scode = 0;
	let message;
	try{
		let _name = req.body.name;
		let _img = req.body.img;
		let _price = req.body.price;
		let _stok = req.body.stok;
		let _description = req.body.description;
		if(!(isNaN(_price) && isNaN(_stok))){
			return res.json({
				'message' : 'tolong masukan angka'
			})
		}
		console.log(req);
		let response = await req.user.createProduct({
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


const updateProduct = (req,res,next) => {
	res.status(200).json({
		'id' : req.params.id,
		'message':'update products'
	});	
}


module.exports = {
	getProducts,
	updateProduct,
	storeProduct
}