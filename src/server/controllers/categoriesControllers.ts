import { Request, Response} from "express";
import { prisma } from "../../bussiness-logic/utils";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const category = await prisma.category.findMany()
        res.json(category)
    } catch (error: any) {
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

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: name
        })
        res.status(200).json(category)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}