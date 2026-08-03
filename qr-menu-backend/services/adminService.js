const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    getAdminByEmail,
} = require("../models/adminModel");

const loginAdmin = async (email, password) => {

    const admin = await getAdminByEmail(email);

    if (!admin) {
        throw new Error("Invalid Email");
    }

    // Temporary plain text check
    if (password !== admin.password) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            id: admin.id,
            email: admin.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,
        admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        },
    };

};

module.exports = {
    loginAdmin,
};