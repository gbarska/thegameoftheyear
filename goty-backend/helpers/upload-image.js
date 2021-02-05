const fs = require('fs');

const Game = require('../models/game');

const deleteImage = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const imageUpload = (file, newImagePath) => {
    file.mv( newImagePath , (err) => {
      if (err){
          console.log(err)
          return false;
        }
    });
return true;
}



module.exports = { 
    imageUpload,
    deleteImage
}
