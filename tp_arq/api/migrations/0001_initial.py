# Generated by Django 5.0.7 on 2024-10-17 21:42

import api.models
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail', models.EmailField(default='', max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='PDI',
            fields=[
                ('id', models.CharField(default=api.models.generate_unique_id, max_length=8, primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=50)),
                ('ciudad', models.CharField(max_length=50)),
                ('direccion', models.CharField(max_length=50)),
                ('categoria', models.CharField(choices=[('G', 'Gastronomía'), ('E', 'Entretenimiento'), ('AL', 'Aire libre'), ('M', 'Música'), ('C', 'Cine'), ('A', 'Artesanías')], max_length=15)),
                ('descripcion', models.CharField(default='', max_length=2000)),
                ('latitud', models.FloatField(validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)])),
                ('longitud', models.FloatField(validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)])),
                ('estado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Establecimiento',
            fields=[
                ('pdi_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.pdi')),
            ],
            bases=('api.pdi',),
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('pdi_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.pdi')),
                ('fechaHora', models.DateTimeField()),
                ('duracion', models.DurationField()),
            ],
            bases=('api.pdi',),
        ),
    ]
