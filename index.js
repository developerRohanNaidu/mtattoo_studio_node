import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json" with { type: "json" };
// import swaggerDocument from "./swagger_output.json" assert { type: "json" };

// routes
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customer.js";
import serviceRoutes from "./routes/service.js";
import saleRoutes from "./routes/sale.js";
import adminRoutes from "./routes/user.js";
import shopRoutes from "./routes/shop.js";
import appointmentsRoutes from "./routes/appointment.js"

// middelwares
import jwtMiddleware from "./middleware/jwtMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import roleMiddleware from "./middleware/roleMiddleware.js";


const app = express();
// var upload = multer();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 

// Routes
app.use("/auth", authRoutes); // Public route for login
app.use("/api/users", jwtMiddleware, adminRoutes); // Protected by super-admin
app.use("/api/shops", jwtMiddleware, shopRoutes); // Protected by super-admin
app.use("/api/customers", jwtMiddleware, customerRoutes); // Protected
// app.use("/api/services", jwtMiddleware, serviceRoutes); // Protected
app.use("/api/services",jwtMiddleware, serviceRoutes); 
app.use("/api/sales", jwtMiddleware, saleRoutes); // Protected
app.use("/api/appointments", jwtMiddleware, appointmentsRoutes); // Protected

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  res.send("ADMIN-PANAL API");
});

// Error handling middleware (last in the middleware stack)
// If we move this line of code above then it will not work as expected, it should be last to be run
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on ${PORT}`))
  )
  .catch((err) => console.log(err.message));
