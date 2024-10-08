# Generated by Django 4.1.3 on 2023-01-10 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_request_med_name_alter_request_med_strength_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="request",
            name="med_name",
            field=models.CharField(
                error_messages={"required": "Medication name cannot be blank"},
                max_length=200,
            ),
        ),
        migrations.AlterField(
            model_name="request",
            name="med_strength",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name="request",
            name="quantity",
            field=models.CharField(
                error_messages={"required": "Quantity cannot be blank"}, max_length=200
            ),
        ),
    ]
