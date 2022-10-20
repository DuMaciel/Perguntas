const Database = require('../db/config')
const getIO = require('../io')

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;


        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id_room = ${roomId}`)
        if (verifyRoom.pass == password) {
            if (action == "delete") {
                await db.run(`DELETE FROM questions WHERE id_question = ${questionId}`)
            } else if (action == "check") {
                await db.run(`UPDATE questions SET  read = 1 WHERE id_question = ${questionId}`)
            }
            const questions = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId}`)
            getIO().emit(`update question ${roomId}`, questions);
            res.redirect(`/room/${roomId}`)
        } else {
            res.redirect(`/room/${roomId}?error=2`)
        }

    },
    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        console.log(JSON.stringify({ question, roomId }, null, 2));


        if (!teste(question)) {
            res.send();
        } else {

            await db.run(`INSERT INTO questions(
            title,
            id_room,
            read
        )VALUES(
            '${question}',
            ${roomId},
            0
        )`)
            const questions = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId}`)
            getIO().emit(`update question ${roomId}`, questions);
            res.send();
        }
    }
}


function teste(texto) {
    for (i = 0; i < texto.length; i++) {
        if ((texto[i] >= 'A' && texto[i] <= 'Z') || (texto[i] >= 'a' && texto[i] <= 'z') || (texto[i] >= '0' && texto[i] <= '9')) {
            return true;
        }
    }
    return false;
}