import express from "express";
import { deleteCode, editCode, loadCode, saveCode } from "../controllers/compilerController";
import { verifyTokenAnonymous } from "../middleware/verifyTokensAnonymous";
import { verifyToken } from "../middleware/verifyToken";

export const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, saveCode)
compilerRouter.delete("/delete/:id", verifyToken, deleteCode)
compilerRouter.put("/edit", verifyToken, editCode)
compilerRouter.post("/load", loadCode)