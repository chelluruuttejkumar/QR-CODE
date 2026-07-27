import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import RestaurantHeader from "../../components/RestaurantHeader";
import CategorySection from "../../components/CategorySection";
import SearchBar from "../../components/SearchBar";
import FloatingCart from "../../components/FloatingCart";

import { getRestaurantMenu } from "../../services/restaurantService";

import "../../styles/menu.css";

function MenuPage() {
  const { menuId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRestaurant();
  }, [menuId]);

  const loadRestaurant = async () => {
    try {
      console.log("Loading Restaurant:", menuId);

      const response = await getRestaurantMenu(menuId);

      console.log("API Response:", response);

      setRestaurant(response.restaurant);
      setMenu(response.menu || []);
    } catch (error) {
      console.error("Error loading restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMenu = useMemo(() => {
    return menu
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.menu_name
            .toLowerCase()
            .includes(search.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [menu, search]);

  if (loading) {
    return (
      <div className="menu-container">
        <h2>Loading Restaurant Menu...</h2>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="menu-container">
        <h2>Restaurant Not Found</h2>
        <p>Please check the Menu ID or Backend API.</p>
      </div>
    );
  }

  return (
    <div className="menu-container">

      <RestaurantHeader
        restaurant={restaurant}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {filteredMenu.length > 0 ? (
        filteredMenu.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
          />
        ))
      ) : (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h3>No Food Items Found</h3>
        </div>
      )}

      <FloatingCart
        restaurant={restaurant}
      />

    </div>
  );
}

export default MenuPage;