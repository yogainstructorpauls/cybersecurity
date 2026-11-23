import { validateClient } from "../model/clients.model.js";
import type {Request, Response, NextFunction} from "express"

export async function validate(req:UserRequest, res:Response, next:NextFunction) {
    if(!req.cookies.token) {
        res.status(401).json({msg: "Unauthorized"})
    } else {
        const match = await validateClient(req.cookies.token)
        if(match) {
            req.user = match
            next()
        } else {
            res.status(401).json({msg: "Unauthorized"})
        }
    }
}