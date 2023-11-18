import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const subirArchivo = (archivo, idUsuario) => {
    return new Promise((resolve, reject) => {
        const extensionesValidas = ['jpg','jpeg', 'png', 'gif', 'mp4']
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1]

        if(!extensionesValidas.includes(extension)) return reject({error: `${extension} no valido`})

        const nombreAleatorio = `${uuidv4()}.${extension}`
        
        const uploadPath = `${__dirname}/../uploads/${idUsuario}/${nombreAleatorio}`
    
        archivo.mv(uploadPath, (error) => {
            if(error) return reject(error)
            resolve(nombreAleatorio)
        })

    })
}