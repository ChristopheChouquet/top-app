module.exports = app => {
    const users = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/loginCreate", users.create);
  
   
  
    app.use('/loginCreate', router);
  };