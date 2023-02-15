import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config.js";
import seedRouter from "./routes/seedRoutes.js";
import CategoryRouter from "./routes/categoryRoutes.js";
import ProductRouter from "./routes/productRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";


//Servidor
const app = express();

//apis intermediarias
app.use(cors());
app.use(morgan(config.LOG_FORMAT || "development" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use(`${config.API_PREFIX}/seed/`, seedRouter);
app.use(`${config.API_PREFIX}/category/`, CategoryRouter);
app.use(`${config.API_PREFIX}/products/`, ProductRouter);
app.use(`${config.API_PREFIX}/users/`, UserRouter);
app.use(`${config.API_PREFIX}/orders/`, OrderRouter);

export default app;