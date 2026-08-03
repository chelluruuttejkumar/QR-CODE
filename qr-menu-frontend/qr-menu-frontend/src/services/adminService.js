const API_URL = import.meta.env.VITE_API_URL;

export const loginAdmin = async (email, password) => {

    const response = await fetch(`${API_URL}/admin/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email,
            password,
        }),

    });

    return await response.json();

};