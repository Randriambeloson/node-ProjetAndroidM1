'use strict';

const { dbconnect } = require('../services/DBConnection.service');
const TokenHelper = require('../services/TokenHelper');

module.exports = class UtilisateurModel {



  async insert (authorization, user) {
    let con = null;

    try {
      con = dbconnect();
      con.connect();
      
      /** **/
      throw new Error('Not supported yet');

    } catch (err) {
      if (con !== null) {
        await con.query('ROLLBACK');
      }
      if (err.code === '23505') {
        throw new Error("Le pseudo '" + user.pseudo + "' est déjà utiliser par un " +
                    'autre utilisateur. Veuillez en choisir un autre'
        );
      }
      throw err;
    } finally {
      if (con !== null) con.end();
    }
  }

  async update (authorization, userInformation) {
    let con = null;
    const tokenHelper = new TokenHelper();
    try {
      con = dbconnect();
      con.connect();
      /** **/
      throw new Error('Not supported yet');

    } catch (err) {
      if (con !== null) {
        await con.query('ROLLBACK');
      }
      throw err;
    } finally {
      if (con !== null) con.end();
    }
  }


  

  async login (data) {
    let con , db = null;
    const tokenHelper = new TokenHelper();
    try {
       con= await dbconnect();
       await con.connect();
       db = await con.db("Kids");
       
      // Tester l'authentification de l'utilisateur effectuant la requête
            
      var result = await this.get_utilisateur_with_connexion(db , data);
      if(result == null || result.length==0) {
          throw new Error("Mot de passe ou identifiant incorrecte");
      }

      let user = result;
      let token = await tokenHelper.insertToken(db, user);
      return {
          token : token,
          user : user   
      };

    } catch (err) {
        throw err;
    } finally {
      // if (con !== null) con.end();
    }
  }

  async get_utilisateur_with_connexion(db , data) {
    var query = data;
    var result = await  db.collection("Utilisateur").findOne(query);
    
    return result;
 }

  async get_utilisateur(data) {
    let con = null;
    let db = null;
    let tokenHelper = new TokenHelper();
    try{
       con= await dbconnect();
       await con.connect();
       db = await con.db("ekalydb");
       // Tester l'authentification de l'utilisateur effectuant la requête
       
        var result = await this.get_utilisateur_with_connexion(db , data);
        if(result == null || result.length==0) {
            throw new Error("Mot de passe ou identifiant incorrecte");
        }

        let user = result;
        let token = await tokenHelper.insertToken(db, user);
        return {
            token : token,
            user : user   
        };
       
   }catch(err){
       console.log(err);
      throw err;
   } finally {
    //   if(con!=null) con.close();
   }
 }

  async logout (authorization) {
    let con = null;
    let db = null;
    const tokenHelper = new TokenHelper();
    const token = tokenHelper.getTokenFromBearerToken(authorization);
    console.log(token);
    try {
      con= await dbconnect();
       await con.connect();
       db = await con.db("Kids");
      await tokenHelper.deleteToken(db , token);
      // await con.query('COMMIT');
      return {
        message: 'Vous vous êtes déconnectez avec succès'
      };
    } catch (err) {
      // if (con !== null) {
      //   // await con.query('ROLLBACK');
      // }
      throw err;
    } finally {
      // if (con !== null) con.end();
    }
  }


};
