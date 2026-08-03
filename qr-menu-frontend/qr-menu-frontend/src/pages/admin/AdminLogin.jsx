import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";
import "../../styles/admin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        const response = await loginAdmin(
            email,
            password
        );

        if (response.success) {

            localStorage.setItem(
                "adminToken",
                response.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(response.admin)
            );

            navigate("/admin/dashboard");

        } else {

            alert(response.message);

        }

    };

    return (

        <div className="admin-login">

            <form
                className="login-card"
                onSubmit={handleLogin}
            >

                <h1>Chelluru Enterprise</h1>

                <h2>Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button>

                    Login

                </button>

            </form>

        </div>

    );

}

export default AdminLogin;