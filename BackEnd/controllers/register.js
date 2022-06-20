require("dotenv").config();

const bcrypt = require('bcrypt');
const db = require('../db')

const register = async (req, res) => {

// Comprobamos que nos pasan usuario y contraseña.
    const { username, password, mail, biography } = req.body
    
    if (!username || !password || !mail){
        res.sendStatus(400)
        return
    }

    const connection = await db.getConnection()

 // Comprobamos si el usuario ya existe error (409)
    const users = await connection.query(`select * from users where username=?`,[username])

    if (users[0].length !== 0) {
        res.sendStatus(409)
        connection.release()
        return
    }

// Cifrar la password con bcrypt
    const hiddenPassword = await bcrypt.hash(password, 10)

// Registramos en DB
    
   await connection.query(`
       insert into users (username, password, mail, biography) 
       values (?, ?, ?, ?)`,[username, hiddenPassword, mail, biography])
       connection.release()
       res.sendStatus(200)
}

module.exports = {
    register
};