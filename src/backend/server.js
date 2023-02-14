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
    const http = require('http');
    const app = require('./app.js');

    const normalizePort = val => {
      const port = parseInt(val, 10);

      if (isNaN(port)) {
        return val;
      }
      if (port >= 0) {
        return port;
      }
      return false;
    };

  //la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
    const port = normalizePort(process.env.PORT || '8080');
    app.set('port', port);

  //la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
    const errorHandler = error => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const address = server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges.');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use.');
          process.exit(1);
          break;
        default:
          throw error;
      }
    };

  //Création du serveur
    const server = http.createServer(app);

  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

  server.listen(port);


