import fs from 'fs';
import { readFile } from 'node:fs/promises';
import path from 'path';

function controllerTemplate(modulo){
    return `
import { initModels } from '../../models/init-models.mjs';
import { dbSequelize } from '../../database/config.mjs';

const { ${modulo} } = initModels(dbSequelize);

export const ${modulo}Controller = {
    post: async(req, res) => {
        try {
            const data = await ${modulo}.create({
                ...req.body,
            });
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    get: async(req, res) => {
        try {
            const data = await ${modulo}.findByPk(req.params.id);
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    gets: async(req, res) => {
        try {
            if(!req.query.page || req.query.page == '0') return res.status(400).json({error: \`parametro page mayor a 0 obligatorio\`})
    
            const {count:total, rows: data} = await ${modulo}.findAndCountAll({
                attributes:{ exclude: ['pass','tipoUsuario'] },
                limit: 5,
                offset: ( Number(req.query.page) - 1 ) * 5,
                order: [ ['id', 'DESC'] ]
            })
            res.json({ total, pages: Math.ceil( total / 5 ), data });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    update: async(req, res) => {
        try {
            // const {body} = req
            const data = await ${modulo}.findByPk(req.params.id);
            //tu logica
            //await data.save();
            res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    
    delete: async(req, res) => {
        try {
            const data = await ${modulo}.destroy({
                where: {id: req.params.id}
            });
            res.json(data)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}
    `
}

function routerTemplate(modulo){
    return `
import { Router } from 'express';

import { ${modulo}Controller } from './${modulo}-controller.mjs';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos.mjs';
import { validarJWT } from '../../middlewares/validar-jwt.mjs';

const ${modulo}Router = Router();

${modulo}Router.post('/', [
    validarJWT,
    //check('campo', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
], ${modulo}Controller.post);

${modulo}Router.get('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], ${modulo}Controller.get)

${modulo}Router.get('/', [
    validarJWT
], ${modulo}Controller.gets)

${modulo}Router.put('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], ${modulo}Controller.update)

${modulo}Router.delete('/:id', [
    validarJWT,
    //check('id').custom(existeRegistroPorId),
    validarCampos
], ${modulo}Controller.delete)

export { ${modulo}Router }
    `
}

async function fileToTxt(){
    try {
        return await readFile('./models/init-models.mjs', {encoding: 'utf8'});
    } catch (error) {
        console.log(error.message);
    }
}


//const regex = /return {(\s+.+)+}/g;
const texto = await fileToTxt();
const bloqueReturn = texto.match(/return {(\s+.+)+}/g)[0];
const modulos = bloqueReturn.match(/\b\w+\b(?=\s*[,}])/g);

const rutas = modulos.map(modulo => `api/${modulo}`);

// cambiar los contents para hacer la estructura basica del crud
const controladores = rutas.map(ruta => {
    let modulo = ruta.split('/')[1];
    return {
        path: `${ruta}/${modulo}-controller.mjs`,
        content: controllerTemplate(modulo)
    }
});
const routers = rutas.map(ruta => {
    let modulo = ruta.split('/')[1];
    return {
        path: `${ruta}/${modulo}-router.mjs`,
        content: routerTemplate(modulo)
    }
});

//console.log(routerTemplate("modulo-test"));

const structureToCreate = [
    'api',
    ...rutas,
    ...controladores,
    ...routers
];

function createStructure(structure, basePath = '.') {
    structure.forEach(item => {
        if (typeof item === 'string') {
            const folderPath = path.join(basePath, item);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
                console.log(`Carpeta creada: ${folderPath}`);
            } else { console.log(`La carpeta ${folderPath} ya existe.`); }
        } else if (typeof item === 'object' && item.hasOwnProperty('path')) {
            const filePath = path.join(basePath, item.path);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, item.content || '', 'utf8');
                console.log(`Archivo creado: ${filePath}`);
            } else { console.log(`El archivo ${filePath} ya existe.`); }
        }
    });
}
// Llama a la función para crear la estructura
createStructure(structureToCreate);

