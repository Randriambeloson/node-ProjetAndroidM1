'use strict';

const { dbconnect } = require('../services/DBConnection.service');
const TokenHelper = require('../services/TokenHelper');
const UtilisateurModel = require('../models/Utilisateur.model');

module.exports = class JeuModel {



  async getAllJeuWithConnexion(db) {
    var result = await  db.collection("Jeu").find({}).toArray();
    
    return result;
 }

 async getJeuByIdWithConnexion(db , id) {
  let query = {identification : id};
  var result = await  db.collection("Jeu").find(query).toArray();
  
  return result[0];
}

async insertScoreWithConnexion(db , Score) {
  db.collection('Score').insert(Score);
}



 async getAllScoreByIdJeuWithConnexion(db , jeuData) {
  let query = {jeu : jeuData};
  var result = await  db.collection("Score").find(query).toArray();
  
  return result;
}

 

  async getAllJeu() {
    let con = null;
    let db = null;
    try{
       con= await dbconnect();
       await con.connect();
       db = await con.db("Kids");
       // Tester l'authentification de l'utilisateur effectuant la requête
       
        var result = await this.getAllJeuWithConnexion(db);
        if(result == null || result.length==0) {
            throw new Error("Aucun Jeu Trouver");
        }

        return result;
       
   }catch(err){
       console.log(err);
      throw err;
   } finally {
    //   if(con!=null) con.close();
   }
 }

 async getAllScoreByIdJeu(id) {
  let con = null;
  let db = null;
  try{
     con= await dbconnect();
     await con.connect();
     db = await con.db("Kids");
     // Tester l'authentification de l'utilisateur effectuant la requête
     
      let jeu = await this.getJeuByIdWithConnexion(db , id);
      var result = await this.getAllScoreByIdJeuWithConnexion(db,jeu);
      console.log(result);
      if(result == null || result.length==0) {
          throw new Error("Aucun Score pour le moment");
      }

      return result;
     
 }catch(err){
     console.log(err);
    throw err;
 } finally {
  //   if(con!=null) con.close();
 }
}

async insertScore(authorization , id , score) {
  let con = null;
  let db = null;
  let tokenHelper = new TokenHelper();
  let utilisateur = new UtilisateurModel();
  try{
     con= await dbconnect();
     await con.connect();
     db = await con.db("Kids");
     const token = await tokenHelper.getTokenFromBearerToken(authorization);
     let user = await tokenHelper.getUserByToken(db , token);
     let jeu = await this.getJeuByIdWithConnexion(db , id);
     user = await utilisateur.createUser(user);
     
      let result_score = {
        utilisateur : user,
        jeu : jeu,
        score : score,
        date : new Date()
      }

      this.insertScoreWithConnexion(db , result_score);

      return result_score;
     
 }catch(err){
     console.log(err);
    throw err;
 } finally {
  //   if(con!=null) con.close();
 }
}



async getJeuById() {
  let con = null;
  let db = null;
  try{
     con= await dbconnect();
     await con.connect();
     db = await con.db("Kids");
     // Tester l'authentification de l'utilisateur effectuant la requête
     
      // var result = await this.getAllScoreByIdJeuWithConnexion(db);
      var result = await this.getJeuByIdWithConnexion(db);

      console.log(result);
      if(result == null || result.length==0) {
          throw new Error("Aucun Jeu correspondant");
      }

      return result;
     
 }catch(err){
     console.log(err);
    throw err;
 } finally {
  //   if(con!=null) con.close()
 }
}
 

 

 


};
