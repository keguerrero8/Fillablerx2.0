# Generated by Django 4.1.3 on 2023-03-17 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_alter_pharmacy_name_alter_request_med_name_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="request",
            name="user_type",
            field=models.CharField(default="none", max_length=200),
        ),
    ]