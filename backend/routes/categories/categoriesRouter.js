const express = require("express");
const {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
} = require("../../controllers/categories/categoriesController");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const categoriesRouter = express.Router();
//!create category route
categoriesRouter.post("/", isLoggedIn, createCategory);

//!fetch all category route
categoriesRouter.get("/", getAllCategories);

//!delete a category route
categoriesRouter.delete("/:id", isLoggedIn , deleteCategory);

//!update a category route
categoriesRouter.put("/:id", isLoggedIn, updateCategory);

module.exports = categoriesRouter;