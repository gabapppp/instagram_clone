# Generated by Django 3.1.7 on 2021-05-19 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20210519_0111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follower',
            name='date_followed',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
