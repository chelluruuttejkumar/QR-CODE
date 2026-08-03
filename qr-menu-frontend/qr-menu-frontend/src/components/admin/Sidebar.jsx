import { Link } from "react-router-dom";
import "../../styles/admin.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        Chelluru Enterprise
      </h2>

      <ul>

        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>

        <li>
          <Link to="/admin/restaurant">Restaurant</Link>
        </li>

        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>

        <li>
          <Link to="/admin/menu">Menu</Link>
        </li>

        <li>
          <Link to="/admin/reports">Reports</Link>
        </li>

        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>

        <li>
          <Link to="/admin/login">Logout</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;