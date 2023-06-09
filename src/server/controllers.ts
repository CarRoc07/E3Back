import { Request, Response} from "express";
import { prisma } from "../bussiness-logic/utils";

// get all

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany()
        res.json(users)
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
export const getBills = async (req: Request, res: Response) => {
    try {
        const bills = await prisma.bills.findMany()
        res.json(bills)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}
export const getCategories = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.findMany()
        res.json(category)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

// get one

export const getUser = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const userFind = await prisma.users.findFirst({
            where: {
                id: idFind
            }
        })
        !userFind
            ? (res.status(500).json({ message: "User not found" }))
            : (res.json(userFind))
    } catch (error: any) {
        res.status(500).json({ message: "Error find user. Please try again." });
    }
}
export const getBill = async (req: Request, res: Response) => {
    console.log(req.params.id)
    try {
        const idFind = req.params.id; 
        const billUnique = await prisma.bills.findFirst({
            where: {
                id: +idFind
            }
        })
        console.log(billUnique)
        !billUnique
            ? (res.status(500).json({message: "Bill Not Found"}))
            : (res.json(billUnique))
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}
export const getCategory = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const categoryFind = await prisma.category.findFirst({
            where: {
                id: +idFind
            }
        })
        !categoryFind
            ? (res.status(500).json({message: "Category Not Found"}))
            : (res.json(categoryFind))
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

// delete one

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const userFind = await prisma.users.delete({
            where: {
                id: idFind
            }
        })
        !userFind
            ? (res.status(500).json({ message: "Error adding user. Please try again." }))
            : (res.json(userFind))
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Error adding user. Please try again." });
    }
}
export const deleteBill = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const billUnique = await prisma.bills.delete({
            where: {
                id: +idFind
            }
        })
        !billUnique
            ? res.status(500).json({ message: "Error deleting bill. Please try again." })
            : (res.json(billUnique))
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ message: "Error deleting bill. Please try again." });
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const categoryFind = await prisma.category.delete({
            where: {
                id: +idFind
            }
        })
        !categoryFind
            ? (res.status(500).json({message: "Error deleting category. Please try again."}))
            : (res.json(categoryFind))
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

// post one

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body; 
        await prisma.users.create({
            data: user
        })
        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: "Error adding user. Please try again." });
    }
}
export const createBill = async (req: Request, res: Response) => {
    try {
        const bill = req.body; 
        await prisma.bills.create({
            data: bill
        })
        res.json(bill)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}
export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = req.body; 
        await prisma.category.create({
            data: category
        })
        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}
