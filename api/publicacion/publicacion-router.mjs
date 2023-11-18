import { Router } from "express";
import { publicacionesController } from "./publicacion-controller.mjs";

const publicacionesRouter = Router();

publicacionesRouter.post('/', [
], publicacionesController.postPublicacion)

publicacionesRouter.get('/:id', [
], publicacionesController.getPublicacion)

publicacionesRouter.get('/', [
], publicacionesController.getPublicaciones)

publicacionesRouter.post('/', [
], publicacionesController.updatePublicacion)

publicacionesRouter.post('/:id', [
], publicacionesController.deletePublicacion)

export {publicacionesRouter}