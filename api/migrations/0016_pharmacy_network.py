# Generated by Django 4.1.3 on 2023-04-29 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0015_pharmacy_signed_agreement_admin"),
    ]

    operations = [
        migrations.AddField(
            model_name="pharmacy",
            name="network",
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
