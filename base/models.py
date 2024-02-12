from django.contrib.auth import get_user_model
from django.db.models import Model, CharField, TextField, DateTimeField, ForeignKey, CASCADE

User = get_user_model()


class Folder(Model):
    user = ForeignKey(User, on_delete=CASCADE, related_name='folders')
    name = CharField(max_length=255)
    created_at = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Note(Model):
    user = ForeignKey(User, on_delete=CASCADE, related_name='notes')
    folder = ForeignKey(Folder, on_delete=CASCADE, related_name='notes', null=True, blank=True)
    content = TextField()
    created_at = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
