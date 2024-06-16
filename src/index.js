const express = require("express");

const ServerConfig = require("./config/serverConfig");
const connectDB = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/carts", cartRouter);

app.listen(ServerConfig.PORT, async () => {
	await connectDB();
	console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
