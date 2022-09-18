const Database = require("../db/config")

module.exports = {
    
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = 0
        let existRoom = true

    do{
        
        do{
        roomId = 0;
        roomId += Math.floor(Math.random()*1000000)
        }while(roomId<100000)
            
        const roomExist = await db.all(`SELECT id_room FROM rooms WHERE id_room = ${roomId}`)

        existRoom = roomExist[0] == null

        if( existRoom){
        await db.run(`INSERT INTO rooms (id_room,pass) 
                      VALUES (${roomId},${pass})`);

        }
    }while(! existRoom);
    await db.close()


    res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE id_room = ${roomId} AND read = 1`)
        let isNoQuestions = false

        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }
        res.render("room", {roomId: roomId, questions: questions, questionsRead, isNoQuestions})
    },

    async enter(req, res){
        const roomId = req.body.roomId
        let roomE = true

        const db = await Database()

        const roomExist = await db.all(`SELECT id_room FROM rooms WHERE id_room = ${roomId}`)

        roomE = roomExist[0] == null
        
        if(! roomE){
        await db.close()
        res.redirect(`/room/${roomId}`)
        } else {
            res.render('roomincorrect.ejs', {roomId: roomId})
        } 
    }
}
