# Utilise une image Python légère
FROM python:3.13-slim

# Définit le répertoire de travail
WORKDIR /app

# Copie et installe les dépendances. "--no-cache-dir" pour ne pas garder certaines données en cache
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

# Copie tout le code du projet dans le conteneur
COPY . .

# Commande de démarrage du serveur Django. Permttre à Django d'ouvrir sur tous les autres interface réseau : "0.0.0.0"
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]