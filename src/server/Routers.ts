import { Router } from "express";
import { 
    createBill,
    createCategory,
    createUser,
    deleteBill,
    deleteCategory,
    deleteUser, getBill,
    getBills,
    getCategories,
    getCategory,
    getUser,
    getUsers } from "./controllers";

export const usersRouter = Router();
export const billsRouter = Router();
export const categoriesRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", createUser);

usersRouter.get("/:id", getUser);

usersRouter.delete("/:id", deleteUser);

billsRouter.get("/", getBills);

billsRouter.post("/", createBill);

billsRouter.get("/:id", getBill);

billsRouter.delete("/:id", deleteBill);

categoriesRouter.get("/", getCategories);

categoriesRouter.post("/", createCategory);

categoriesRouter.get("/:id", getCategory);

categoriesRouter.delete("/:id", deleteCategory);