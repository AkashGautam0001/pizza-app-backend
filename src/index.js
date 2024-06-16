const express = require("express");
const cookieParser = require("cookie-parser");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const { isLoggedIn } = require("./validation/authValidator");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);

app.get("/ping", isLoggedIn, (req, res) => {
	console.log(req.cookies);
	return res.json({
		message: "Ping Pong",
	});
});

app.listen(ServerConfig.PORT, async () => {
	await connectDB();
	console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
