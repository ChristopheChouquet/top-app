# Utilisez une image Node.js officielle comme image de base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de votre application
RUN npm install

# Copiez le reste de votre code source dans le conteneur
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 5000

# Définissez la commande pour exécuter votre application
CMD [ "node", "index.js" ]