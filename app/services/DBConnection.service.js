'use strict';

/* Initialisation du module pg */
const { Client } = require('pg');
const MongoClient = require('mongodb').MongoClient;
const connexFilePath = '../../config/database_config.json';
const connexFile = require.resolve(connexFilePath);

/* Fonction de connexion à la base Postgres */
// const dbconnect = function () {
//   delete require.cache[connexFile];
//   const config = require(connexFilePath);
//   /* Chaine de connexion à la base */

//   return new Client({
//     host: config.server,
//     port: config.port,
//     user: config.username,
//     password: config.password,
//     database: config.databasename,
//     client_encoding: 'utf8'
//   });
// };

/* Fonction de connexion à la base MongoDb */
async function dbconnect() {
	var client = null;
    delete require.cache[connexFile];
	const config = require(connexFilePath);

	try {
	  const uri = "mongodb+srv://"+config.username+":"+config.password+"@"+config.server;
	  client = new MongoClient(uri);
	// Connect to the MongoDB cluster
	  
	  // Connect to the MongoDB cluster
	  return client;

	} catch (e) {
	  console.error(e);
	} 
  }
/* Exportation le la fonction de connexion */
module.exports.dbconnect = dbconnect;
