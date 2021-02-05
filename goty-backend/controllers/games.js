const { response } = require('express');

const Game = require('../models/game');

const getGames = async(req, res = response) => {

    const pageIndex = Number(req.query.pageIndex) || 0;
    const pageSize = Number(req.query.pageSize) || 5;

    const [games, total] = await Promise.all([
        Game.find({}, 'name img votes id')
                            .skip( pageIndex * pageSize)
                            .limit(pageSize),
        Game.countDocuments()
    ]);

    res.json({
        ok: true,
        total,
        count: games.length,
        games
    });
}

const createGame = async(req, res = response) => {

    try {

        const game = new Game({ 
            ...req.body
         });

        // Guardar Game
       const result = await game.save();
        
        res.json({
            ok: true,
            game: result
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'There was an error... see the logs'
        });
    }
}

const updateGame = async (req, res = response) => {

    const gameId = req.params.id

    try {

        const gameDB = await Game.findOne({ id: gameId });

        if ( !gameDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Game not found'
            });
        }

        // Actualizaciones
        const { name, img } = req.body;

        const game = {
            name,
            img
        };

        const gameActualizado = await Game.findOneAndUpdate( { id: gameId }, game, { new: true } );

        res.json({
            ok: true,
            game: gameActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'There was an error...see the logs'
        })
    }

}


const deleteGame = async(req, res = response ) => {

    const gameId = req.params.id

    try {

        const gameDB = await Game.findOne( { id: gameId } );

        if ( !gameDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Game not found'
            });
        }

        await Game.findOneAndDelete( { id: gameId } );
       
        res.json({
            ok: true,
            msg: 'Game has been successfully deleted'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'There was an error...see the logs'
        });

    }
}

const postVote = async(req, res) => {

    const gameId = req.params.id

    try {

        const gameDB = await Game.findOne({ id: gameId });

        if ( !gameDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Game not found'
            });
        }


       const votes = gameDB.votes || 0;

       const game = {
        votes: votes+1
    };
  
    await Game.findOneAndUpdate( {id: gameId }, game, { new: true } );
    
    res.json({
        ok: true,
        mensaje: `Gracias por tu voto a ${ gameDB.name }`
    });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'There was an error...see the logs'
        });

    }
}

module.exports = {
    getGames,
    createGame,
    updateGame,
    deleteGame,
    postVote
}