import { Request, Response } from "express";
import { Code } from "../models/Code";
import { fullCodeType } from "../types/compilerTypes";
import { AuthRequest } from "../middleware/verifyTokensAnonymous";
import { User } from "../models/User";

export const saveCode = async (req: AuthRequest, res: Response) => {
    const {fullCode,title}:{fullCode:fullCodeType,title:string} = req.body;

    console.log(req._id);
    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let user = undefined;
    let isAuthenticated = false;


    if (req._id) {
        user = await User.findById(req._id);

        if (!user) {
            return res.status(404).send({ message: "Cannot find the user!" });
        }

        ownerName = user?.username;
        ownerInfo = user?._id;
        isAuthenticated = true
    }


    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({
            message: "Code cannot be Empty/blank"
        })
    }
    try {
        const newCode = await Code.create({
            fullCode: fullCode,
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title,
        
        })

         console.log(newCode);

        //  check authenticated
        if(isAuthenticated && user){
            user?.savedCodes.push(newCode._id);
            await user.save();
        }
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


export const getMyCodes = async (req: AuthRequest, res: Response) => {
    const userId = req._id;
    try {

        // find user and then when save code then last code save on up...
      const user = await User.findById(userId).populate({
        path: "savedCodes",
        options: { sort: { createdAt: -1 } },
      });
  
      if (!user) {
        return res.status(404).send({ message: "Cannot find User!" });
      }
      return res.status(200).send(user.savedCodes);
    } catch (error) {
      return res.status(500).send({ message: "Error loading my codes!", error });
    }
  };


export const getAllCodes = async (req: Request, res: Response) => {
    try {
      const allCodes = await Code.find().sort({ createdAt: -1 });
      return res.status(200).send(allCodes);
    } catch (error) {
      return res.status(500).send({ message: "Error editing code!", error });
    }
  };

export const deleteCode = async (req:AuthRequest,res:Response)=>{
    const userId = req._id;
    const {id} = req.params;
    try{
            const owner = await  User.findById(userId);
            if(!owner){
                return res.status(404).send({message:"Cannot find the owner profile!"});
            }
            console.log("Delete id",id);


            // find exist code 
            const  existCode = await Code.findById(id);

            if(!existCode){
                return res.status(404).send({message:"Code not found!"});
            }

            if(existCode.ownerName !== owner.username){

                return res.status(400).send({message:"You Don't have permission to delete this code !"});
            }


            const deleteCode = await Code.findByIdAndDelete(id);
            console.log(deleteCode);

            if(deleteCode){
                return res.status(200).send({message:"Code deleted Successfully!"});
            }
            else{
                return res.status(404).send({message:"Code not found!"});
            }
            
            return res.status(200).send({id});
  }
    catch(error){
        console.log("Backend Delete Code",error);
        return res.status(500).send({ message: "Error delete code!", error });

    }

  }

export const editCode = async (req:AuthRequest,res:Response)=>{
    try{

    }
    catch(error){
        console.log("Backend Edit Code",error);
        return res.status(500).send({ message: "Error edit code!", error });
    }

}