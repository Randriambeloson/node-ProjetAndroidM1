'use strict';
const UtilisateurModel = require('../models/Utilisateur.model');
const requestMetadata = require('../../config/app_config/metadataRequest_config');
/* Declaration du controller en question */
const UtilisateurController = function (app) {
  // Authentification d'un utilisateur
 

  app.post('/login' , async function(req,res) {
    let response = {};
    let authorization = req.headers ["authorization"];
    let utilisateur = new UtilisateurModel();
    try{
        if(req.body.identifiant == "undefined" || req.body.identifiant == undefined || req.body.identifiant == "" || req.body.identifiant == undefined || req.body.mdp == "undefined" || req.body.mdp == "") throw new Error("Parametre invalide")
        let data = {
            identifiant : req.body.identifiant,
            mdp : req.body.mdp
        }
        response ["metadata"] = requestMetadata.requestMetadata.successMetadata;
        response ["data"] = await utilisateur.login(data);
    }
    catch(e){
        response ["metadata"] = requestMetadata.requestMetadata.errorMetadata;
        response ["errorMessage"] = e.message;
    }finally{
        res.send(JSON.stringify(response));
    }
})


  // Deconnexion
  app.get('/logout', async function (req, res) {
    const response = {};
    const utilisateur = new UtilisateurModel();
    const authorization = req.headers.authorization;
    try {
      response.metadata = requestMetadata.requestMetadata.successMetadata;
      response.data = await utilisateur.logout(authorization);
    } catch (e) {
      response.metadata = requestMetadata.requestMetadata.errorMetadata;
      response.errorMessage = e.message;
    } finally {
      res.send(JSON.stringify(response));
    }
  });

  // Inscription
  app.post('/inscription', async function (req, res) {
    const response = {};
    const utilisateur = new UtilisateurModel();
    const authorization = req.headers.authorization;
    try {
      response.metadata = requestMetadata.requestMetadata.successMetadata;
      response.data = await utilisateur.insert(authorization, req.body);
    } catch (e) {
      response.metadata = requestMetadata.requestMetadata.errorMetadata;
      response.errorMessage = e.message;
    } finally {
      res.send(JSON.stringify(response));
    }
  });

  // Mise à jour
  app.post('/update', async function (req, res) {
    const response = {};
    const utilisateur = new UtilisateurModel();
    const authorization = req.headers.authorization;

    try {
      response.metadata = requestMetadata.requestMetadata.successMetadata;
      response.data = await utilisateur.update(authorization, req.body);
    } catch (e) {
      response.metadata = requestMetadata.requestMetadata.errorMetadata;
      response.errorMessage = e.message;
    } finally {
      res.send(JSON.stringify(response));
    }
  });

};
module.exports = UtilisateurController;
