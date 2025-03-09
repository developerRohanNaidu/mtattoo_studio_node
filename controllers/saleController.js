import Sale from "../models/sale.js";
import Customer from "../models/customer.js";
import { getDateRange } from "../utils/helpers.js";
import { NotFoundError } from "../utils/errorResponse.js";
import twilio from 'twilio';
const accountSid = "AC920e72cd63ed4b581099b34872cfc64d";
const authToken = "c60725bfefa80de21e09d6d7d2397b72";
const twilioWhatsAppNumber = "whatsapp:+14155238886";
const twilioPhoneNumber ="+16507188297";
const client = twilio(accountSid, authToken);

export const getSales = async (req, res, next) => {
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
      query.shopId = shopId;
    }

    const sales = await Sale.find(query)
      .populate("createdBy")
      .populate("shopId")
      .populate("customerId")
      .populate("serviceIds");

    res.json(sales.length ? sales : []);
  } catch (error) {
    next(error);
  }
};

export const addSale = async (req, res, next) => {
  try {
    const { serviceIds, amount, shopId, phoneNumber } = req.body;

    // need to check if this is the better way as we are featching whole object to get customer id by msisdn
    const customer = await Customer.findOne({ phoneNumber: phoneNumber });

    if (!customer) {
      throw new NotFoundError(
        "phone no. not found, Please onboard customer first"
      );
    }

    const sale = new Sale({
      customerId: customer._id,
      serviceIds,
      amount,
      shopId,
      phoneNumber,
      createdBy: req.user.userId,
    });
    await sendSMS("+91"+customer.phoneNumber, amount)
    await sale.save();
    res.json({ message: "Sale added successfully" });
  } catch (error) {
    return next(error);
  }
};

// we are not using yet
// export const getSalesByCustomer = async (req, res, next) => {
//   try {
//     const id = req.params.customerId;
//     const sales = await Sale.find({ customerId: id })
//       .populate("createdBy")
//       .populate("shopId")
//       .populate("customerId")
//       .populate("serviceIds");
//     res.json(sales);
//   } catch (error) {
//     return next(error);
//   }
// };

export const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const sale = await Sale.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!sale) {
      throw new NotFoundError("Sale not found");
    }

    res.status(200).json({ message: "Sale is deleted" });
  } catch (error) {
    next(error);
  }
};

// Set up Twilio for WhatsApp messaging
const twilioClient = twilio(accountSid, authToken);
// Function to send email and WhatsApp message
export const sendWhatsAppMessage = async (mobileNumber, amount) => {
  try {
    const message = await client.messages.create({
      body: `Hello! Your account has been charged ₹${amount}. Thank you!`,
      from: twilioWhatsAppNumber,
      to: `whatsapp:${mobileNumber}`, // Pass the recipient's mobile number dynamically
    });

    console.log("Message sent:", message.sid);
    return { success: true, message: "WhatsApp message sent successfully" };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, message: "Failed to send WhatsApp message" };
  }
};

export const sendSMS = async (mobileNumber, amount) => {
  try {
    const message = await client.messages.create({
      // body: `Hello! Your tattoo has been successfully billed for ₹${amount}. We appreciate your trust in our art! 🖋️✨
      // Thank you for choosing **MTattoo Studio**. We look forward to inking more amazing designs for you! 🎨 `,
      body: `Hello! Your tattoo has been successfully billed for ₹${amount}. We appreciate your trust in our art! 🖋️✨ --- MTattoo Studio`,
      from: twilioPhoneNumber, 
      to: mobileNumber, 
    });

    console.log("SMS sent:", message.sid);
    return { success: true, message: "SMS sent successfully" };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, message: "Failed to send SMS" };
  }
};

