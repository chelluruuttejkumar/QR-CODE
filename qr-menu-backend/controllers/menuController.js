const supabase = require("../config/supabase");
const QRCode = require("qrcode");
const path = require("path");

// ==============================
// Create Menu
// ==============================
const createMenu = async (req, res) => {
  try {
    const { menu_name, description, price } = req.body;

    // Validation
    if (!menu_name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Insert menu into Supabase
    const { data, error } = await supabase
      .from("menus")
      .insert([
        {
          menu_name,
          description,
          price,
        },
      ])
      .select();

    if (error) {
      console.log("Insert Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const menuId = data[0].id;

    // QR URL
    const menuUrl = `http://localhost:5173/menu/${menuId}`;

    // QR Image Path
    const qrPath = path.join(
      __dirname,
      "../uploads/qrcodes",
      `menu-${menuId}.png`
    );

    // Generate QR
    await QRCode.toFile(qrPath, menuUrl);

    // Update QR Path
    await supabase
      .from("menus")
      .update({
        qr_code: `qrcodes/menu-${menuId}.png`,
      })
      .eq("id", menuId);

    return res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: {
        id: menuId,
        qr_code: `qrcodes/menu-${menuId}.png`,
      },
    });
  } catch (error) {
    console.error("Create Menu Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get Menu By ID
// ==============================
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("==================================");
    console.log("Requested Menu ID:", id);

    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .eq("id", Number(id));

    console.log("Supabase Data:", data);
    console.log("Supabase Error:", error);
    console.log("==================================");

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.error("Get Menu Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createMenu,
  getMenuById,
};