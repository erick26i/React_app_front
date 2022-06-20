const db = require('../db')

const uploadFile = async (req, res) => {
    if( !req.file || !req.params ){
        res.sendStatus(400)
        return
    }
    const connection = await db.getConnection()
    await connection.query(`UPDATE services SET file=? where id=?`,[req.file.filename, req.params.id])
    res.sendStatus(200)
    connection.release()
}

module.exports = {
    uploadFile
}