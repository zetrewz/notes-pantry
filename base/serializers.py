from rest_framework.serializers import ModelSerializer

from base.models import Folder, Note


class NoteListSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user', 'folder', 'content')


class NoteCreateSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ('user', 'folder', 'content')


class NoteUpdateSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ['content']


class FolderListSerializer(ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'user', 'name')


class FolderDetailSerializer(ModelSerializer):
    notes = NoteListSerializer(many=True)

    class Meta:
        model = Folder
        fields = ('id', 'user', 'name', 'notes')


class FolderCreateSerializer(ModelSerializer):
    class Meta:
        model = Folder
        fields = ('user', 'name')


class FolderUpdateSerializer(ModelSerializer):
    class Meta:
        model = Folder
        fields = ['name']
