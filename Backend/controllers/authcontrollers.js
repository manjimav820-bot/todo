
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "manjima@2002";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(409).send("Email already exists");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        res.status(200).send("User has been registered successfully");

    } catch (error) {
        res.status(500).send("Error while registering user");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
    return res.status(404).json({
        success: false,
        message: "User not found. Please register."
    });
}

        const ispwdmatch = await bcrypt.compare(password, user.password);

        if (!ispwdmatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid password. Try again."
    });
}

        const authToken = jwt.sign(
            { userid: user._id,name:user.name },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

       res.status(200).json({
    success: true,
    message: "Login successful",
    token: authToken,
    userid: user._id,
    name:user.name

});
      

    } catch (error) {
        console.log(error);
        res.status(500).send("Error while logging in");
    }
};

module.exports = { registerUser, loginUser };
