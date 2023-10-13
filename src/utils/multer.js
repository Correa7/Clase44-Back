// El middleware de multer deberá estar modificado para que pueda guardar en diferentes carpetas
//  los diferentes archivos que se suban.
// Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, 
// en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, 
// mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.
const {__dirname} = require('./dirname')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, __dirname+'public/documents')
    },
    filename: function (req, file, cb){
        cb(null,file.originalname)
    }
})
const uploader= multer({storage})
module.exports = uploader

