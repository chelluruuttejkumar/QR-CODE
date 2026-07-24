const supabase = require("../config/supabase");

const getRestaurantMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Get restaurant
    const { data: restaurant, error: restaurantError } = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", id)
      .single();

    if (restaurantError || !restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Get categories
    const { data: categories, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", id);

    if (categoryError) {
      return res.status(500).json({
        success: false,
        message: categoryError.message,
      });
    }

    // Get menu items
    const { data: menuItems, error: menuError } = await supabase
      .from("menu_items")
      .select("*")
      .eq("restaurant_id", id);

    if (menuError) {
      return res.status(500).json({
        success: false,
        message: menuError.message,
      });
    }

    // Group items by category
    const menu = categories.map((category) => ({
      ...category,
      items: menuItems.filter(
        (item) => item.category_id === category.id
      ),
    }));

    return res.status(200).json({
      success: true,
      restaurant,
      menu,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getRestaurantMenu,
};