import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { initModels } from '../../models/init-models.mjs'
import { dbSequelize } from '../../database/config.mjs'

const { usuarios: Usuarios } = initModels(dbSequelize);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const multimediaController = {
    // para consultar un archivo por url
    getArchivo: async(req, res) => {
        try {
            const filePath = path.join(__dirname, `../../uploads/${req.headers['usuario_id']}/${req.params.nombre}`);
            await fs.access(filePath);
            res.sendFile(filePath);
        } catch (error) {
            const noImageFilePath = path.join(__dirname, '../../assets/no-image.jpg');
            if (error.code == 'ENOENT') return res.sendFile(noImageFilePath);
            return res.status(400).json({error});
        }
    },

    postMultimedia: async(req, res) => {
        try {
            res.json('todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    getMultimedia: async(req, res) => {
        try {
            res.json('todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    getMultimedias: async(req, res) => {
        try {
            res.json('todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    updateMultimedia: async(req, res) => {
        try {
            res.json('todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
    deleteMultimedia: async(req, res) => {
        try {
            res.json('todo bien');
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    },
}