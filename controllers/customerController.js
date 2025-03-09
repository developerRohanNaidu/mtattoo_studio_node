import Customer from "../models/customer.js";
import { NotFoundError } from "../utils/errorResponse.js";
import { getDateRange } from "../utils/helpers.js";

// add new customer
export const addCustomer = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfBirth,
      gender,
      onboardedShopId,
    } = req.body;
    const customer = new Customer({
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfBirth,
      gender,
      onboardedShopId,
      createdBy: req.user.userId,
    });

    await customer.save();
    res.json({ message: "Customer added successfully" });
  } catch (e) {
    return next(error);
  }
};

// // not using yet
// export const getCustomerById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const customer = await Customer.findById(id)
//       .populate("createdBy")
//       .populate("onboardedShopId");
//     if (!customer) {
//       throw new NotFoundError("Customer not found");
//     }
//     res.json(customer);
//   } catch (error) {
//     return next(error);
//   }
// };

// need to remove this
// export const getAllCustomers = async (req, res, next) => {
//   try {
//     // Fetch all customers from the database
//     const customers = await Customer.find();

//     // If no customers are found, return a 404 response
//     if (customers.length === 0) {
//       throw new NotFoundError("Customers not found");
//     }

//     // Return the list of customers
//     res.json(customers);
//   } catch (error) {
//     return next(error);
//   }
// };

// export const getCustomersByShop = async (req, res, next) => {
//   try {
//     const shopId = req.params.shopId;
//     const customers = await Customer.find({ shopId });
//     if (!customers || customers.length === 0) {
//       throw new NotFoundError("Customers not found");
//     }
//     res.json(customers);
//   } catch (error) {
//     return next(error);
//   }
// };

export const getCustomers = async (req, res, next) => {
  try {
    const { startDate, endDate, shopId } = req.query;
    const { startRange, endRange } = getDateRange(startDate, endDate);

    // Build the query object
    const query = {
      isDeleted: false, // Exclude soft-deleted sales
    };

    // Add date range filter to the query if both startDate and endDate are provided
    if (startRange && endRange) {
      query.createdAt = {
        $gte: new Date(startRange),
        $lte: new Date(endRange),
      };
    }

    // If shopId is provided, add it to the query
    if (shopId) {
      query.onboardedShopId = shopId;
    }

    const customers = await Customer.find(query)
      .populate("createdBy")
      .populate("onboardedShopId");

    res.json(customers.length ? customers : []);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  const { id } = req.params; // customer ID from the URL
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      dateOfBirth,
      gender,
      onboardedShopId,
    } = req.body;

    // Find the appointment and update fields
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phoneNumber,
        email,
        dateOfBirth,
        gender,
        onboardedShopId,
        updatedBy: req.user.userId, // Track who updated it
      },
      { new: true } // Return the updated document
    );

    if (!updatedCustomer) {
      throw new NotFoundError("Customer not found");
    }

    res.json({
      message: "Customer updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the appointment ID from the URL
    const { reason } = req.body;

    // Soft delete: Update a `isDeleted` flag
    const deletedCustomer = await Customer.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!deletedCustomer) {
      throw new NotFoundError("Customer not found");
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
