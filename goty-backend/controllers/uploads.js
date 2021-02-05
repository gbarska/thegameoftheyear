const path = require('path');
const fs = require('fs');

const Game = require('../models/game');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { imageUpload, deleteImage } = require('../helpers/upload-image');

const fileUpload = async( req, res = response ) => {
   
    const type = req.params.type;
    const id   = req.params.id;

    // Validar type
    const validTypes = ['games'];
    if ( !validTypes.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'Type must be "game"'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'There must be a valid image'
        });
    }

    // Procesar la imagen...
    const file = req.files.image;

    const nameSplited = file.name.split('.'); // wolverine.1.3.jpg
    const fileExtension = nameSplited[ nameSplited.length - 1 ];
    
    // Validar extension
    const validExtensions = ['png','jpg','jpeg','gif'];
    if ( !validExtensions.includes( fileExtension ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'The file extension must be either: "png", "jpg", "jpeg", "gif"'
        });
    }

    var entity = await findByIdAndType(id, type);

    //entidade nao existe
    if (!entity){
      return res.status(400).json({
            ok: false,
            msg: `The ${type.slice(0, -1)} was not found`
     });
    }

    // Generar el nombre del archivo
    const fileName = `${ uuidv4() }.${ fileExtension }`;
    // Path para guardar la imagen
    const path = `./uploads/${ type }/${ fileName }`;
    const oldImagePath = `./uploads/${type}/${ entity.img }`;

    //deleta imagem anterior se existir...
    if (entity.img){
        deleteImage(oldImagePath);
    }

    // carrega nova imagem
    if (!imageUpload(file, path )){
        return res.status(500).json({
            ok: false,
            msg: 'There was an error uploading the file'
        });
    } 

    entity.img = fileName;
    await entity.save(); 

    return  res.json({
        ok: true,
        msg: 'The file has been uploaded',
        fileName
    });
}


const getImage = ( req, res = response ) => {

    const type = req.params.type;
    const picture = req.params.picture;

    const imgPath = path.join( __dirname, `../uploads/${ type }/${ picture }` );

    // imagen por defecto
    if ( fs.existsSync( imgPath ) ) {
        res.sendFile( imgPath );
    } else {
        const imgPath = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( imgPath );
    }

}

const findByIdAndType = async(id, type) => {
    switch( type ) {
        case 'games':
            return await Game.findById(id);
        // case 'users':
        //     return await User.findById(id);
        }
}


module.exports = {
    fileUpload,
    getImage
}