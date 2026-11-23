import { Router } from "express";

const router = Router()

router.get("/health", (req, res)=> {
    res.json({status: "ok", uptime: process.uptime(), usage: process.cpuUsage()})
})

router.get("/", (req, res)=> {
    res.json({title: "Welcome to API"})
})

export default router