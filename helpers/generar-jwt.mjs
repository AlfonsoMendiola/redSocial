import jwt from "jsonwebtoken";

export const generarJWT = (id) => {
    return new Promise( (resolve, reject) => {
        const payload = {id}

        jwt.sign(payload, process.env.SECRETO_PRIVATEKEY, {
            expiresIn: '30d'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject({err, msg: 'no se genero el token'})
            }else{ resolve(token) }
        })
    } )
}