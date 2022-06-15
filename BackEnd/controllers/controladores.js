require("dotenv").config();

const db = require('../db')
let updateComment;

const addComment = async (req, res) => {
    const {comments, id} = req.body
    try{
    if (!id || !comments) {
        res.status(403).send("[ERROR] Faltan datos para añadir un comentario")
        return
    }
    const connection = await db.getConnection()
    updateComment = `UPDATE services SET comments= "${comments}" where id=${id}`
    
    await connection.query(updateComment)
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