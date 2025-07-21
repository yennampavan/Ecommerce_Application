import express from "express";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  getCart
} from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.post("/add", requireSignIn, addToCart);
router.post("/increase", requireSignIn, increaseQuantity);
router.post("/decrease", requireSignIn, decreaseQuantity);
router.post("/remove", requireSignIn, removeFromCart);
router.get("/", requireSignIn, getCart);

export default router;
