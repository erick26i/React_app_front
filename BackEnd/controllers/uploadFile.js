const path = require('path')
const db = require('../db')


const uploadFile = async (req, res) => {
    if( !req.file || !req.params ){
        res.sendStatus(400)
        return
    }
    const connection = await db.getConnection()
    const setFile = `UPDATE services SET file= "${req.file.filename}" where id=${req.params.id}`
    await connection.query(setFile)
    res.sendStatus(200)
    connection.release()
}

module.exports = {
    uploadFile
}