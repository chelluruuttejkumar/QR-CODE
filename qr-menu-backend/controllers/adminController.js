const {
    loginAdmin,
} = require("../services/adminService");

const adminLogin = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        const result = await loginAdmin(
            email,
            password
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            ...result,
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    adminLogin,
};