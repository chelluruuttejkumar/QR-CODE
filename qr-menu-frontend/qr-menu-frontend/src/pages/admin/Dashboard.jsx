import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

function Dashboard() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <h1>Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h2>Total Orders</h2>
                        <h1>0</h1>
                    </div>

                    <div className="card">
                        <h2>Revenue</h2>
                        <h1>₹0</h1>
                    </div>

                    <div className="card">
                        <h2>Pending</h2>
                        <h1>0</h1>
                    </div>

                    <div className="card">
                        <h2>Completed</h2>
                        <h1>0</h1>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;