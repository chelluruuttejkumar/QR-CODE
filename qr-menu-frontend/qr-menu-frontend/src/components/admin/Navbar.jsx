import "../../styles/admin.css";

function Navbar() {

    const admin = JSON.parse(localStorage.getItem("admin"));

    return (

        <div className="navbar">

            <h2>Dashboard</h2>

            <div>

                Welcome,

                <b>
                    {admin?.email}
                </b>

            </div>

        </div>

    );

}

export default Navbar;