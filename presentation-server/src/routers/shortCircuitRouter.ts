import express from "express";

export default () => {
    const router = express.Router();
   
    router.get("/", (req , res, next) => {
        res.send({ message: "Hello World"});
    });

    
    return router;
}
