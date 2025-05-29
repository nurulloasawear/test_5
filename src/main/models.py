from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255, verbose_name="Nomi")
    is_completed = models.BooleanField(default=False, verbose_name="Bajarilgan")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return self.title

class Project(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nomi")
    start_date = models.DateField(blank=True, null=True, verbose_name="Boshlanish sanasi")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return self.name