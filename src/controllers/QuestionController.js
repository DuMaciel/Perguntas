const Database = require('../db/config')
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
            res.redirect(`/room/${roomId}`)
        } else {
            res.redirect(`/room/${roomId}?error=true`)
        }

    },
    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room



        if (!teste(question)) {
            res.render('questionincorrect.ejs', { roomId: roomId })
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
            res.redirect(`/room/${roomId}`)
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