const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");

const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(ServerConfig.PORT, async () => {
	await connectDB();
	console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
