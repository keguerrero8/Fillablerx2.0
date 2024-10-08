# Generated by Django 4.1.3 on 2022-12-12 02:02

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Pharmacy",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200, unique=True)),
                ("address", models.CharField(max_length=300)),
                ("zipcode", models.CharField(max_length=20)),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        blank=True, max_length=128, region=None
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Pharmacist",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=200)),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        blank=True, max_length=128, region=None
                    ),
                ),
                ("email", models.EmailField(max_length=200)),
                ("isEnrolled", models.BooleanField(default=False)),
                (
                    "pharmacy_name",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.pharmacy"
                    ),
                ),
            ],
        ),
    ]
