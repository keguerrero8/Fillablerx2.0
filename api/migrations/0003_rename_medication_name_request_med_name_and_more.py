# Generated by Django 4.1.3 on 2022-12-16 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_medication_request_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="request",
            old_name="medication_name",
            new_name="med_name",
        ),
        migrations.RenameField(
            model_name="request",
            old_name="medication_strength",
            new_name="med_strength",
        ),
        migrations.AlterField(
            model_name="medication",
            name="brand_name",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]