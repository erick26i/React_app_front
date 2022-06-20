require("dotenv").config();

const db = require('../db')

const getUsers = async (req,res) =>{
    const connection = await db.getConnection()
    const users = await connection.query(`select id, username from users`)
    if(users[0]){
        res.status(200).send(users[0])
        connection.release()
    } else {
        res.send("No hay usuarios registrados")
        connection.release()
    }
    connection.release()
}

module.exports = {
    getUsers
}