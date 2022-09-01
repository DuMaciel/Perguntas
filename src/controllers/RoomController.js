const Database = require("../db/config")

module.exports = {
    
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = 0
        let existRoom = true

    do{
        roomId += Math.floor(Math.random()*1000000)

        const roomsExistIds = await db.all(`SELECT id_room FROM rooms`)
        
        existRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId)

        if(! existRoom){
        await db.run(`INSERT INTO rooms (id_room,pass) 
                      VALUES (${roomId},${pass})`);

        }
    }while(existRoom);
    await db.close()


    res.redirect(`/room/${roomId}`)
    },
    open(req, res){
        const roomId = req.params.room
        res.render("room", {roomId : roomId})
    },
}

