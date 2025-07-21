import User from "../models/userModel.js";

// Add item to cart (if not present, quantity = 1)
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Product already in cart"
      });
    }

    user.cart.push({ product: productId, quantity: 1 });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to cart", error });
  }
};

// Increase quantity
export const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    item.quantity += 1;
    await user.save();

    res.json({ success: true, message: "Quantity increased", cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error increasing quantity", error });
  }
};

// Decrease quantity (and remove if it becomes 0 or 1)
export const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    if (item.quantity <= 1) {
      user.cart = user.cart.filter(
        (i) => i.product.toString() !== productId
      );
    } else {
      item.quantity -= 1;
    }

    await user.save();
    res.json({ success: true, message: "Quantity updated", cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error decreasing quantity", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    res.json({ success: true, message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing item", error });
  }
};

// Get user cart (with product details)
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");

    res.json({ success: true, cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching cart", error });
  }
};
