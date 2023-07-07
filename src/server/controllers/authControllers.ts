import { Decoded } from './../../bussiness-logic/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './../../config';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response} from "express";
import { User, prisma } from "../../bussiness-logic/utils";
import bcrypt from 'bcrypt'

export const registerAuth = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const user: User = req.body;
        const userFind = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if (userFind) return res.status(400).json({error: "Email already exists"})
        const hashPass = await bcrypt.hash(password, 10);
        const userCreated = await prisma.users.create({
            data: {
                ...user,
                password: hashPass,
            }
        });

        const accessToken = jwt.sign({email: email, name: name, id: userCreated.id},
            ACCESS_TOKEN_KEY,
            { expiresIn: '1h' })
        const refreshToken = jwt.sign({email: email, name: name, id: userCreated.id}, REFRESH_TOKEN_KEY, { expiresIn: '12h' })

        res.json({ accessToken: accessToken, refreshToken: refreshToken  });
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const loginAuth = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userFind = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if (!userFind) return res.status(400).json({error: "Email not found"})

        const valid = await bcrypt.compare(password, userFind.password);
        if(!valid) return res.status(400).json({error: "Invalid password"})

        const accessToken = jwt.sign({email: email, name: userFind.name, id: userFind.id},
            ACCESS_TOKEN_KEY,
            { expiresIn: '1h' })
        const refreshToken = jwt.sign({email: email, name: userFind.name, id: userFind.id}, REFRESH_TOKEN_KEY, { expiresIn: '12h' })
        res.json({ accessToken: accessToken, refreshToken: refreshToken  });
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const refreshAuthToken = async (req: Request, res: Response) => {
    try {
        let refreshToken = req.headers.authorization?.split(' ')[1];
        if (!refreshToken) return res.status(401).json({error: "Unauthorized: Token not provided"})

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_KEY) as Decoded;
        if (!decoded) return res.status(401).json({error: "Unauthorized: Token not valid"})

        const accessToken = jwt.sign({email: decoded.email, name: decoded.name, id: decoded.id}, ACCESS_TOKEN_KEY, {expiresIn: '1h'})
        refreshToken = jwt.sign({email: decoded.email, name: decoded.name, id: decoded.id}, REFRESH_TOKEN_KEY, {expiresIn: '12h'})

        res.json({accessToken: accessToken,refreshToken: refreshToken});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if(!accessToken) return res.status(401).json({error: "Unauthorized: Token not provided"})

        jwt.verify(accessToken, ACCESS_TOKEN_KEY, async (err, user) => {
            if(err) return res.status(401).json({error: "Unauthorized: Token not valid"})
            if(!user) return res.status(401).json({error: "Unauthorized: Token not valid"})
            req.body.user = user;
            next()
        })
    } catch (error) {
        res.status(500).json({error: error});
    }
}

