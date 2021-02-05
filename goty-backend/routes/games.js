/*
    Ruta: /api/games
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getGames, createGame, updateGame, deleteGame, postVote } = require('../controllers/games');


const router = Router();


router.get( '/', getGames );

router.post( '/',
    [
     check('name', 'Name is required').not().isEmpty(),
     validarCampos
    ], 
    createGame 
);

router.post( '/:id', postVote);

router.put( '/:id',
    [
      check('name', 'Name is required').not().isEmpty(),
      validarCampos
    ],
    updateGame
);



router.delete( '/:id',  deleteGame);



module.exports = router;