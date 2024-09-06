import UserModel from "../models/ModelUser";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
const register = async (req: any, res: any) => {
    const body = req.body;
    dotenv.config()
    const {email,name,password}=body
    try {


        // kiểm trả đã tồn tại email chưa ,nếu chưa thì mới thêm dc user
        const user=await UserModel.findOne({email})

        if(user)   {
            throw new Error("Tai khoan da ton tai")
        }

        const salt= await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        console.log(hashPassword)

        body.password = hashPassword

        const newUser=new UserModel(body)
        await newUser.save()
        
        

        console.log(body)
        res.status(200).json({
            message: "Resgister",
            data: newUser
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

export{ register}