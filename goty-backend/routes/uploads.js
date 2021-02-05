/*

    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { check } = require('express-validator');
//midleware para validar o resultado do express validator..
const { validarCampos } = require('../middlewares/validar-campos');

const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

router.put('/:type/:id', [
    check('id', 'The id must be valid').isMongoId(),
    validarCampos
    ], fileUpload );

    
router.get('/:type/:picture', getImage );



module.exports = router;