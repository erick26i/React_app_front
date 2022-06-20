require("dotenv").config();

const db = require('../db')

const addComment = async (req, res) => {
    const {comments, id} = req.body
    let connection;
    try{
    if (!id || !comments) {
        res.status(403).send("[ERROR] Faltan datos para añadir un comentario")
        return
    }
    connection = await db.getConnection()

    await connection.query(`UPDATE services SET comments=? where id=?`, [comments, id])
    res.status(200).send("[EXITO] Comentario añadido correctamente")
    connection.release()
} catch {
    res.status(403).send("[ERROR] Hemos encontrado un problema con la DB")
    connection.release()
}
}

module.exports = {
    addComment
};