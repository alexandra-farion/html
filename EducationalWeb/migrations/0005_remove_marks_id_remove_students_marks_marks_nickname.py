# Generated by Django 4.1 on 2022-05-14 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EducationalWeb', '0004_remove_marks_nickname_remove_students_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='marks',
            name='id',
        ),
        migrations.RemoveField(
            model_name='students',
            name='marks',
        ),
        migrations.AddField(
            model_name='marks',
            name='nickname',
            field=models.CharField(default='mihalis', max_length=100, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]