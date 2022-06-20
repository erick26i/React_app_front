require("dotenv").config()
const db = require('../db')

// Listamos todos los servicios disponibles.
const getServices = async (req, res) => {
    
    const connection = await db.getConnection()
    const sqlGetServices = `select * from services`
    const respuesta = await connection.query(sqlGetServices)
    if(respuesta[0][0]){
        res.status(200).send(respuesta[0])
        connection.release()
        
    } else {
        res.send("No hay servicios disponibles")
    }
}

// Creamos el nuevo servicio.
const createService = async (req, res) => {

        const connection = await db.getConnection()
        const {title, description, comments} = req.body
        
        if(!title || !description){
            res.status(403).send("[ERROR] el servicio no esta creado, rellene los campos necesarios e intentelo de nuevo")
            return
        }
    // Extraemos el id del usuario que crea el servicio.
        const userId = req.appInfo.id

    // Insertamos en DB los servicios creados por el usuario.
        const sqlCreateService = `insert into services (title, description, comments, userId) 
        values ("${title}","${description}", "${comments}", ${userId})`
        await connection.query(sqlCreateService)

        const sqlServiceId = `select id from services where userId=${userId} order by id desc limit 1;`
        const bdRes = await connection.query(sqlServiceId)
        const sqlAux = `INSERT INTO aux (id_user, id_service) values (${userId},${bdRes[0][0].id})`
        await connection.query(sqlAux)
        res.status(200).send("[EXITO] Servicio creado correctamente")
        connection.release()
}

const markAsComplete = async (req, res) => {
    const connection = await db.getConnection()
    const idService = req.params.id
    await connection.query(`UPDATE services set complete=true where id=?`,[idService])
    res.status(200).send("[EXITO] Servicio completado !!")
    connection.release()
}

const completedService = async (req, res, next)=>{
    const connection = await db.getConnection()
    await connection.query(`select * from services where complete=true`)
    next()
}

const deleteService = async (req, res)=>{
    const connection = await db.getConnection()
    await connection.query(`DELETE FROM aux where id_service=?`,[req.params.id])
    await connection.query(`DELETE FROM services where id=?`,[req.params.id])
    res.status(200).send("[EXITO] Servicio eliminado !!")
    connection.release()
}
module.exports = {
    createService,
    getServices,
    markAsComplete,
    deleteService,
    completedService
} 