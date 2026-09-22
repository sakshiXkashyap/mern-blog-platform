const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require ("./routes/users/usersRouter");
const connectDB = require("./config/database");
const { notFound, globalErrorHandler } = require("./middlewares/globalErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const postsRouter = require("./routes/posts/postsRouter");

//!Create an express app
const app = express();

//! load the environment variable
dotenv.config();

//!Establish connection to Mongodb
connectDB();
//!set up the middleware
app.use(express.json());
//?Setup the Router
app.use("/api/v1/users", usersRouter);
//?seetup the category router
app.use("/api/v1/categories", categoriesRouter);

//?seetup the Post router
app.use("/api/v1/posts", postsRouter);
//?not found error hanler
app.use(notFound);
//?Setup the global error handler
app.use(globalErrorHandler);
const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
 console.log(`Server started at ${PORT}`);     
});