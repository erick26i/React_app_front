require('dotenv').config();

const { getConnection } = require('./db');

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borramos BD si existe
    console.log('Borramos BD, "si existe"');
    await connection.query(`DROP DATABASE proyecto`);

    // Creamos Base de datos y seleccionamos
    console.log('Creamos DB');
    await connection.query(`CREATE DATABASE proyecto`);
    await connection.query(`USE proyecto`);

    // Borrar las tablas si existen (diary, diary_votes)
    console.log('Borrando tablas');
    await connection.query('DROP TABLE IF EXISTS aux');
    await connection.query('DROP TABLE IF EXISTS services');
    await connection.query('DROP TABLE IF EXISTS users');

    // Crear las tablas de nuevo
    console.log('Creando tablas');

    await connection.query(`
      CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR (100) NOT NULL,
          password VARCHAR(300) NOT NULL,
          mail VARCHAR(50) NOT NULL,
          biography VARCHAR(300) NOT NULL,
          insession BOOLEAN DEFAULT false
      );
    `);

    await connection.query(`
    CREATE TABLE services (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR (100) NOT NULL,
        description VARCHAR(300) NOT NULL,
        file VARCHAR(1000),
        comments VARCHAR(300),
        complete BOOLEAN default false,
        userId INTEGER NOT NULL,
        foreign key (userId) references users(id)
      );
    `);

    await connection.query(`
      CREATE TABLE aux(
        id INTEGER unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
        id_user INTEGER NOT NULL,
        id_service INTEGER NOT NULL,
        foreign key (id_user) references users(id),
        foreign key (id_service) references services(id)
    );
    `);
    // Meter datos de prueba en las tablas
    connection.release();
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Todo hecho, liberando conexión');
    if (connection) connection.release();
    process.exit();
  }
}

main();
