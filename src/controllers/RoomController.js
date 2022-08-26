const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        let roomId = 0
        roomId += Math.floor(Math.random()*1000000)

        await db.run(`INSERT INTO rooms (id_room,pass) 
                      VALUES (${roomId},${pass})`)

        await db.close()


        res.redirect(`/room/${roomId}`)
        
    }
}