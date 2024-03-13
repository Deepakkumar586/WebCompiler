import express from "express";
import { deleteCode, editCode, getAllCodes, loadCode, saveCode } from "../controllers/compilerController";
import { verifyTokenAnonymous } from "../middleware/verifyTokensAnonymous";
import { verifyToken } from "../middleware/verifyToken";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, saveCode)
compilerRouter.delete("/delete/:id", verifyToken, deleteCode)
compilerRouter.put("/edit/:id", verifyToken, editCode)
compilerRouter.post("/load", verifyTokenAnonymous, loadCode)
compilerRouter.get("/all-codes", getAllCodes)