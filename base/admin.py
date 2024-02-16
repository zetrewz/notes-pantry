from django.contrib import admin
from django.contrib.admin import ModelAdmin

from base.models import Folder, Note


@admin.register(Folder)
class FolderAdmin(ModelAdmin):
    list_display = ['user', 'name', 'parent_folder', 'created_at']


@admin.register(Note)
class NoteAdmin(ModelAdmin):
    list_display = ['user', 'folder', 'content', 'created_at']
