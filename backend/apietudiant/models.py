from django.db import models

# Create your models here.
from django.db import models

class Etudiant(models.Model):
    numCarte = models.CharField(unique=True, max_length=50)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    telephone = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f"{self.nom} {self.prenom} {self.numCarte} {self.telephone} {self.email}"