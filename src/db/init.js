const Database = require("./config")

const initDb = {
    async init(){

    const db = await Database()

    await db.exec(`
        CREATE TABLE rooms (
            id_room INTEGER PRIMARY KEY,
            pass TEXT
        );`)

    await db.exec(`
        CREATE TABLE questions (
            id_question INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            id_room INTEGER
        );`)

        await db.close()
    }
}

initDb.init();