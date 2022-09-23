const Database = require("../db/config")

module.exports = {

    async create(req, res) {
        const db = await Database()
        const pass = req.body.password

        let roomId = 0
        let existRoom = true

        do {


            do {
                roomId = 0;
                roomId += Math.floor(Math.random() * 1000000)
            } while (roomId < 100000)

            const roomExist = await db.all(`SELECT id_room FROM rooms WHERE id_room = ${roomId}`)

            existRoom = roomExist[0] == null

            if (existRoom) {

                await db.run(`INSERT INTO rooms (id_room,pass,create_date) 
                      VALUES (${roomId},'${pass}',DATETIME('now','-3 hours'))`);
            }

        } while (!existRoom);
        await db.close()


        res.redirect(`/room/${roomId}`)
    },
    async open(req, res) {
        const db = await Database()
        const withError = req.query.error;

        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId} AND read = 1`)
        let isNoQuestions = false

        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true
            }
        }
        res.render("room", { roomId: roomId, questions: questions, questionsRead, isNoQuestions, withError })
    },

    async enter(req, res) {
        const roomId = req.body.roomId
        let roomE = true

        const db = await Database()

        if (!(roomId == '')) {
            const roomExist = await db.all(`SELECT id_room FROM rooms WHERE id_room = ${roomId}`)
            roomE = roomExist[0] == null
            if (!roomE) {
                await db.close()
                res.redirect(`/room/${roomId}`)
            } else {
                res.redirect(`/?error=${roomId}`)
            }
        } else {
            res.redirect(`/?error=${roomId}`)
            clearDB()
        }
    },
}


async function clearDB() {
    const db = await Database()
    const rooms = await db.all(`SELECT id_room FROM rooms WHERE STRFTIME('%Y-%m-%d %H:%M:%S',create_date) < STRFTIME('%Y-%m-%d %H:%M:%S',DATETIME('now','-8 hours'))`)
    console.log(rooms)
    for (i = 0; i < rooms.length; i++) {
        await db.run(`DELETE FROM questions WHERE id_room = ${rooms[i].id_room}`)
        await db.run(`DELETE FROM rooms WHERE id_room = ${rooms[i].id_room}`)
    }
}