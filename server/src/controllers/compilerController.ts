import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeType } from "../types/compilerTypes";

export const saveCode = async (req: Request, res: Response) => {
    const fullCode: fullCodeType = req.body;
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({
            message: "Code cannot be Empty/blank"
        })
    }
    try {
        const newCode = await Code.create({
            fullCode: fullCode
        })
        return res.status(201).send({
            success: true,
            message: "Create Code Successfully",
            newCode,
            url: newCode._id,
            status: "saved!"
        })
    }
    catch (err) {
        console.log("Error in Saving Code", err);
        return res.status(500).send({
            message: "Error Saving code", err
        })
    }
}
export const loadCode = async (req: Request, res: Response) => {
    const { urlId } = req.body;
    try {
        const existCode = await Code.findById(urlId);

        if (!existCode) {
            return res.status(404).json({
                success: false,
                message: "Code not Found"
            })
        }

        return res.status(201).json({
            success: true,
            message: "get existing code",
            fullCode: existCode.fullCode,
            urlId
        })

    }
    catch (err) {
        console.log("Error in Loading Code", err);
        return res.status(500).send({
            message: "Error Loading code", err
        })
    }
}