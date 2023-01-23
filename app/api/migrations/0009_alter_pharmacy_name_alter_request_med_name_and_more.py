# Generated by Django 4.1.3 on 2023-01-15 04:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_alter_request_med_name_alter_request_med_strength_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pharmacy",
            name="name",
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name="request",
            name="med_name",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name="request",
            name="quantity",
            field=models.CharField(max_length=200),
        ),
    ]