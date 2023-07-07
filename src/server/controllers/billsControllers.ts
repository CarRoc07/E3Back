import { RequestBody } from './../../bussiness-logic/utils';
import { Request, Response} from "express";
import { prisma } from "../../bussiness-logic/utils";

export const getBills = async (req: Request, res: Response) => {
    try {
        const user = req.body.user
        let filter = {
            userID: user.id,
            created_at: undefined || {}
        }
        
        const { startDate, endDate }: RequestBody = req.body;
        if(startDate && endDate) {
            filter = {
                created_at: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                userID: user.id
            }
        }
        const bills = await prisma.bills.findMany({
            where: filter
        })
        res.json(bills)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getBill = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id;
        const billUnique = await prisma.bills.findFirst({
            where: {
                id: +idFind,
                userID: req.body.user.id
            }
        })
        !billUnique
            ? (res.status(500).json({message: "Bill Not Found"}))
            : (res.json(billUnique))
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deleteBill = async (req: Request, res: Response) => {
    try {
        const idFind = req.params.id; 
        const billUnique = await prisma.bills.deleteMany({
            where: {
                id: +idFind,
                userID: req.body.user.id
            }
        })
        !billUnique
            ? res.status(500).json({ message: "Error deleting bill. Bill not found" })
            : (res.status(204).json())
    } catch (error: any) {
        res.status(500).json({ message: "Error deleting bill." });
    }
}

export const createBill = async (req: Request, res: Response) => {
    try {
        const { bill, categoryID, price } = req.body;
        const user = req.body.user
        const result = await prisma.bills.create({
            data: {
                bill: bill,
                categoryID: categoryID,
                userID: user.id,
                price: price
            }
        })
        res.send(result)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}