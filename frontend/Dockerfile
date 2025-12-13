# Étape 1: Build (Construction de l'application)
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Assurez-vous que cette commande correspond à la construction de votre Frontend (ex: 'npm run build' est courant)
RUN npm run build 

# Étape 2: Serveur (Servir l'application construite via Nginx)
FROM nginx:stable-alpine as production-stage
# Supposons que le fichier construit est dans /app/build
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]