# Generated by Django 4.1.3 on 2023-05-17 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0017_pharmacy_initial_rate"),
    ]

    operations = [
        migrations.AddField(
            model_name="medication",
            name="isSpecialty",
            field=models.BooleanField(default=False),
        ),
    ]