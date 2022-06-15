require("dotenv").config();

const db = require('../db')

const getUsers = async (req,res) =>{
    const connection = await db.getConnection()
    const sqlGetUser = `select id, username from users`
    const users = await connection.query(sqlGetUser)
    if(users[0]){
        res.status(200).send(users[0])
        connection.release()
    } else {
        res.send["No hay usuarios registrados"]
        connection.release()
    }

}

module.exports = {
    getUsers
}