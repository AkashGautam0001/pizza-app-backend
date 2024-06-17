const express = require("express");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const { isLoggedIn } = require("./validation/authValidator");
const uploader = require("./middlewares/multerMiddleware");
const cloudinary = require("./config/cloudinaryConfig");

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
app.post("/photo", uploader.single("incoming"), async (req, res) => {
	console.log(req.file);
	const result = await cloudinary.uploader.upload(req.file.path);
	console.log(result);

	await fs.unlink(req.file.path, (err) => {
		if (err) throw err;
		console.log("file was deleted");
	});

	return res.json({ message: "OK" });
});

app.listen(ServerConfig.PORT, async () => {
	await connectDB();
	console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
