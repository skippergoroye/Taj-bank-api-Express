import express, { Request, Response } from 'express';




const createUserRoute = () => {
  const router = express.Router();

  router.post("/register", (req: Request, res: Response) => {
    res.send({ message: 'Login Successful'})
  })


  router.post("/login", (req: Request, res: Response) => {
    res.send({ message: 'Login Successful'})
  })



  router.post("/forgot-password", (req: Request, res: Response) => {
    res.send({ message: 'Login Successful'})
  })


  router.post("/reset-password", (req: Request, res: Response) => {
    res.send({ message: 'Login Successful'})
  })

  return router;
};

export default createUserRoute();