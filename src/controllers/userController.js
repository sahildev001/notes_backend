    const userModel = require('../model/user');
    const bcrypt = require('bcrypt');
    const jsonWebToken = require('jsonwebtoken');

    const SECRET_KEY = process.env.SECRET_KEY;

    //-------------------Sign up-----------------
    const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check validation
        const validationStatus = validateUserSignUp(req.body);

        if (!validationStatus.valid) {
        return res.status(400).json({ message: validationStatus.message });
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        // Hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username
        });

        // Generate token
        const token = jsonWebToken.sign({ email: result.email, id: result._id }, SECRET_KEY);

        res.status(200).json({ token: token, data: result });
    } catch (error) {
        console.log(`Error on signUp ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
    }
    function validateUserSignUp(requestBody) {
        const { username, password, email } = requestBody;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isValidEmail = emailRegex.test(email);

        if (!username || username.trim() === "") {
        return { valid: false, message: "'username' should not be empty" };
        } else if (!password || password.trim() === "") {
        return { valid: false, message: "'password' should not be empty" };
        } else if (!email || email.trim() === "") {
        return { valid: false, message: "'email' should not be empty" };
        }else if (!isValidEmail) {
        return { valid: false, message: "use valid email" };
        }

        return { valid: true };
    }

//-----------------------SignIn -------

    const signin = async (req, res) => {
    const {email,password} = req.body;
    try{
    //validate credentials
    const  validationStatus = validateUserSignIn(req.body);
    if (!validationStatus.valid) {
    return res.status(400).json({ message: validationStatus.message });
    }

    const user = await userModel.findOne({email:email});
    // check user not found
    if(!user){
        return res.status(400).json({message: "user not found"});
    }

    //compare password
    const isValidPassword = await   bcrypt.compare(password,user.password);
    if(!isValidPassword){
        return res.status(400).json({ message: "password did not match" });
    }


//generate token
    const token = jsonWebToken.sign({ email: user.email, id: user._id }, SECRET_KEY);

    return res.status(200).json({token: token, data : user});


    }catch(error){
        console.log(`Error on signUp ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
    }




    function validateUserSignIn(requestBody) {
        const { password, email } = requestBody;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isValidEmail = emailRegex.test(email);

        if (!email || email.trim() === "") {
            return { valid: false, message: "'email' should not be empty" };
        }  else if (!password || password.trim() === "") {
        return { valid: false, message: "'password' should not be empty" };
        }  

        return { valid: true };
    }

    module.exports = { signin, signup };
