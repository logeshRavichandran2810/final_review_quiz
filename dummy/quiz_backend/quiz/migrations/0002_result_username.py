# Generated by Django 3.2.19 on 2025-02-15 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='username',
            field=models.CharField(default='nithish', max_length=255),
            preserve_default=False,
        ),
    ]
