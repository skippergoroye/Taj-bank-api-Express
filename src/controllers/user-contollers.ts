import { Request, Response } from "express";
import UserService from "../services/user-service"

class UserController {
    private userService: UserService

    constructor (_userService: UserService) {
        this.userService = _userService
    }



    async register(req: Request, res: Response) {
        try {
            res.send({ message: "Resgistration succesful"})
        } catch (error) {
             res.send({ message: "Server Error"})
            
        }

    }


     async login(req: Request, res: Response) {
        try {
            res.send({ message: "Login succesful"})
        } catch (error) {
             res.send({ message: "Server Error"})
            
        }

    }



     async forgotPassword(req: Request, res: Response) {
        try {
            res.send({ message: "Forgot Password mail sent"})
        } catch (error) {
             res.send({ message: "Server Error"})
            
        }

    }



     async resetPassword(req: Request, res: Response) {
        try {
            res.send({ message: "Reset Password succesful"})
        } catch (error) {
             res.send({ message: "Server Error"})
            
        }

    }
}


export default UserController