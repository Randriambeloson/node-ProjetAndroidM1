'use strict';

const { dbconnect } = require('../services/DBConnection.service');
const TokenHelper = require('../services/TokenHelper');

module.exports = class UtilisateurModel {



  async getAllJeuWithConnexion(db) {
    var result = await  db.collection("Jeu").find({}).toArray();
    
    return result;
 }

 async getAllScoreByIdJeuWithConnexion(db) {
  var result = await  db.collection("Score").find({id : "1"}).toArray();
  
  return result;
}

 

  async getAllJeu(data) {
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
     
      var result = await this.getAllScoreByIdJeuWithConnexion(db);
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

 

 

 


};
