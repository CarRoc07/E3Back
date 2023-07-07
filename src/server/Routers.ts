import { Router } from "express";
import { createBill, deleteBill, getBill, getBills} from "./controllers/billsControllers";
import { createCategory, deleteCategory, getCategory, getCategories  } from "./controllers/categoriesControllers";
import { loginAuth, refreshAuthToken, registerAuth, verifyToken } from "./controllers/authControllers";

export const billsRouter = Router();
export const categoriesRouter = Router();
export const authRouter = Router();

authRouter.post("/login", loginAuth);

authRouter.post("/register", registerAuth)

authRouter.post("/refresh", refreshAuthToken)

billsRouter.get("/", verifyToken, getBills);

billsRouter.post("/", verifyToken, createBill);

billsRouter.get("/:id", verifyToken, getBill);

billsRouter.delete("/:id", verifyToken, deleteBill);

categoriesRouter.get("/", verifyToken, getCategories);

categoriesRouter.post("/", verifyToken, createCategory);

categoriesRouter.get("/:id", verifyToken, getCategory);

categoriesRouter.delete("/:id", verifyToken, deleteCategory);