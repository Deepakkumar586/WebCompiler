import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode =async (req: Request, res: Response) => {
    const {fullCode} = req.body;
    try {
        const newCode = await Code.create({
            fullCode:fullCode
        })
        return res.status(201).json({
            success:true,
            message:"Create Code Successfully",
            newCode,
        })
    }
    catch (err) {
        console.log("Error in Saving Code",err);
            return res.status(500).send({
                message:"Error Saving code",err
            })
    }
}