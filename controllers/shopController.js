import Shop from "../models/shop.js";
import { NotFoundError } from "../utils/errorResponse.js";

export const addShop = async (req, res, next) => {
  try {
    const { shopName, location, serviceIds, city, state, country } = req.body;
    const shop = new Shop({
      shopName,
      location,
      serviceIds,
      city,
      state,
      country,
      createdBy: req.user.userId,
    });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    return next(error);
  }
};

export const ShopFetch = async (req, res, next) => {
  const { shopIds } = req.body; // Expecting an array of shop IDs // need the jou
  try {
    // console.log("shops id>> ", req.body);
    const shops = await Shop.find({
      _id: { $in: shopIds },
      isDeleted: { $ne: true },
    })
      .populate("createdBy")
      .populate("serviceIds"); // Fetch details from the database
    // console.log("shops >> ", shops);
    res.status(200).json(shops);
  } catch (error) {
    return next(error);
  }
};

export const getAllShops = async (req, res, next) => {
  try {
    // Fetch all customers from the database
    const shops = await Shop.find({ isDeleted: { $ne: true } })
      .populate("createdBy")
      .populate("serviceIds");

    // If no customers are found, return a 404 response
    if (shops.length === 0) {
      throw new NotFoundError("Shops not found");
    }

    // Return the list of customers
    res.json(shops);
  } catch (error) {
    return next(error);
  }
};

export const deleteShop = async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const shop = await Shop.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!shop) {
      throw new NotFoundError("Shop not found");
    }

    res.status(200).json({ message: "Shop is deleted" });
  } catch (error) {
    next(error);
  }
};
