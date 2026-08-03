const supabase = require("../config/supabase");

const getAdminByEmail = async (email) => {

    const { data, error } = await supabase
        .from("admin")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        return null;
    }

    return data;

};

module.exports = {
    getAdminByEmail,
};