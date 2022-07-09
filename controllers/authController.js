const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const register = async (req,res,next) => {
	try{
		const { name,email,password } = req.body;
		console.log(req.body);
		if (!(name && email && password)) {
	      	res.status(400).json({"message":"All input is required"});
	    }

	    const userExist = await User.findOne({where:{email:email}});
	    if(userExist != null){
	    	return res.status(409).send("User Already Exist. Please Login");
	    }
	    let encryptedPassword = await bcrypt.hash(password, 10);

	    const user = await User.create({
	      name,
	      email: email, 
	      password: encryptedPassword,
	    });	

	    const token = jwt.sign(
	    		{user_id:user.id,email:user.email},
	    		'sitampan',
	    		{
	    			expiresIn: "2h",
	    		}
	    	);
	    user.token = token;
	    res.status(201).json({ message: 'User created!', userId: user.id , token:user.token});
	}catch(err){
		console.log(err)
		res.status(500).json({message:'Something went wrong'})
	}
	 
}

const login = async (req,res,next) => {
	try{
		const {email,password } = req.body;
		console.log(req.body);
		if (!(email && password)) {
	      	res.status(400).json({"message":"All input is required"});
	    }

	    const userExist = await User.findOne({where:{email:email}});
	    if(userExist == null){
	    	return res.status(401).send("A user with this email could not be found");
	    }
	    let isEqual = await bcrypt.compare(password, userExist.password);

	    if(!isEqual){
	    	const error = new Error('Wrong password!');
	        error.statusCode = 401;
	        throw error;
	    }

	    const token = jwt.sign(
	    		{user_id:userExist.id,email:userExist.email,role:userExist.role},
	    		process.env.JWT_SECRET,
	    		{
	    			expiresIn: "2h",
	    		}
	    	);
	    res.status(200).json({ message: 'Login Success!', userId: userExist.id , token});
	}catch(err){
		res.status(500).json({message:err.toString()})
	}
}

module.exports = {
	register,
	login
}