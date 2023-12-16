import { Router } from "express";

const noEncontradoRouter = Router()

noEncontradoRouter.all('*', (req, res) => {
    return res.status(400).json({error: 'url no valida'})
})

export { noEncontradoRouter }