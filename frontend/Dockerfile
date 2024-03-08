# Utilisez une image Node.js officielle comme image de base
FROM node:14 as build

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances de votre application
RUN npm install

# Copiez le reste de votre code source dans le conteneur
COPY . .

# Construisez votre application React
RUN npm run build

# Utilisez une image Nginx pour servir votre application
FROM nginx:alpine

# Copiez le build de votre application dans le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Remplacez la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Exposez le port 80
EXPOSE 80

# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]