'use strict';
const JeuModel = require('../models/Jeu.model');
const requestMetadata = require('../../config/app_config/metadataRequest_config');
/* Declaration du controller en question */
const JeuController = function (app) {
  // Authentification d'un utilisateur
 

  app.get('/getAllJeu' , async function(req,res) {
    let response = {};
    let authorization = req.headers ["authorization"];
    let Jeu = new JeuModel();
    try{
        
        response ["metadata"] = requestMetadata.requestMetadata.successMetadata;
        response ["data"] = await Jeu.getAllJeu();
    }
    catch(e){
        response ["metadata"] = requestMetadata.requestMetadata.errorMetadata;
        response ["errorMessage"] = e.message;
    }finally{
        res.send(JSON.stringify(response));
    }
})

app.post('/getAllScoreByIdJeu' , async function(req,res) {
  let response = {};
  let authorization = req.headers ["authorization"];
  let Jeu = new JeuModel();
  let id = req.body.idJeu;
  try{
      
      response ["metadata"] = requestMetadata.requestMetadata.successMetadata;
      response ["data"] = await Jeu.getAllScoreByIdJeu(id);
  }
  catch(e){
      response ["metadata"] = requestMetadata.requestMetadata.errorMetadata;
      response ["errorMessage"] = e.message;
  }finally{
      res.send(JSON.stringify(response));
  }
})


  
};
module.exports = JeuController;
