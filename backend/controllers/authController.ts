import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, fullname, phone, position, isAdmin } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email }});
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password, hashedPassword,
                fullname,
                phone,
                position,
                isAdmin: isAdmin || false,
                vacationDaysTotal: 30,
                vacationDaysUsed: 0,
                provider: 'local'
            }
        })

        const token = jwt.sign({ id: newUser.id, isAdmin: newUser.isAdmin},
            process.env.JWT_SECRET as string,
            { expiresIn: '1d'}

        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                fullname: newUser.fullname,
                isAdmin: newUser.isAdmin
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Registration failed'})
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where : { email }});
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
            
        }

        const token = jwt.sign( {id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET as string, { expiresIn: '1d'} );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                fullname: user.fullname,
                isAdmin: user.idAdmin
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Login failed'})
    }
}