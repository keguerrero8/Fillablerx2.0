# Generated by Django 4.1.3 on 2023-03-23 16:13

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_alter_request_user_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="pharmacy",
            name="contact_email",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="contact_name",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="contact_phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                blank=True, max_length=128, null=True, region=None
            ),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="contact_title",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="npi",
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="signed_agreement_stamp",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
