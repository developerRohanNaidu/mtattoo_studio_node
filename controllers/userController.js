import user from "../models/user.js";
import User from "../models/user.js";
import { ValidationError } from "../utils/errorResponse.js";
import { NotFoundError } from "../utils/errorResponse.js";

export const addAdmin = async (req, res, next) => {
  try {
    const { username, password, role, shopIds } = req.body;
    const user = new User({
      username,
      password,
      role,
      shopIds,
      createdBy: req.user.userId,
    });

    // Check if a shops array are not null
    if (!shopIds || shopIds?.length <= 0) {
      throw new ValidationError(
        "Admins must be associated with at least one shop."
      );
    }

    await user.save();
    res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.json(user);
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false })
      .populate("shopIds")
      .populate("createdBy");
    if (users.length === 0) {
      throw new NotFoundError("Users not found");
    }

    // Return the list of users
    res.json(users);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params; // user ID from the URL
    const { password, shopIds } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    // Find the appointment and update fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username: user.username,
        password: password ? password : user.password,
        role: user.role,
        shopIds: shopIds ? shopIds : user.shopIds,
        updatedBy: req.user.userId,
      },
      { new: true } // Return the updated document
    );

    res.json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const deletedUser = await User.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!deletedUser) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({ message: "User permanently deleted" });
  } catch (error) {
    return next(error);
  }
};
