  /********************************************* PREMIERE ETAPE *********************************************/
  /* INSTALLATION DE NODEMON "npm install -g nodemon" 
  /* IL REMPLACE "node server" par "nodemon server"
  /* IL LANCE LE SERVER AUSSI MAIS ACTUALISE AUTO APRES CHAQUE MODIF
  /***************************************************************************************************************/

  /********************************************** DEUXIEME ETAPE **************************************************/
  /* INSTALLATION D'EXPRESS "npm install express" 
  /* IL PERMET DE SIMPLIFIER LE DEPLOYEMENT DES APIS
  /***************************************************************************************************************/
  
  
  //Configuration d'un serveur
    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");
    
    const app = express();
    
    var corsOptions = {
      origin: "http://localhost:8081"
    };
    
    app.use(cors(corsOptions));
    
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to bezkoder application." });
    });


    require("./routes/tutorials.routes")(app);

    
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });


    const db = require("./models");
    db.mongoose
      .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });