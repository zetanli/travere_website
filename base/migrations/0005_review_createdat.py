# Generated by Django 4.2.3 on 2023-07-20 00:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_product_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]