# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-18 22:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CLC_FASD', '0002_medication_dosage'),
    ]

    operations = [
        migrations.AddField(
            model_name='medication',
            name='taken',
            field=models.BooleanField(default=False),
        ),
    ]