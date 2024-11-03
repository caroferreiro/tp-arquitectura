# Generated by Django 5.0.7 on 2024-11-03 15:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail', models.EmailField(default='', max_length=50, unique=True)),
                ('contraseña', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(8)])),
            ],
        ),
    ]
