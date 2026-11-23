import { registerClientsModel } from "../model/clients.model.js";
import type { Request, Response } from "express";
import jwt  from "jsonwebtoken";

export async function registerClientsController(req: Request, res:Response) {
    if(!process.env.JWT_SECRET) {
    return
    }
    try {
        const id = await registerClientsModel(req.body.username)
        const token = jwt.sign({id: id}, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true
        })
        res.status(201).json("API_key created") 
    } catch (err) {
        console.error(err)
        res.status(403).json({msg: "Database error"})
    }
}   

export async function testController(req: Request, res:Response){
    res.json({msg: "test"})
}