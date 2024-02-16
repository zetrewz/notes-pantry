from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView

from base.models import Folder, Note
from base.serializers import FolderListSerializer, NoteListSerializer, FolderCreateSerializer, NoteCreateSerializer, \
    FolderUpdateSerializer, NoteUpdateSerializer, FolderDetailSerializer


class FolderListView(ListAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderListSerializer

    def get_queryset(self):
        """
        Возвращает только те объекты Folder, у которых нет родительского объекта.
        """
        return Folder.objects.filter(parent_folder__isnull=True)


class FolderDetailView(RetrieveAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderDetailSerializer


class FolderCreateView(CreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderCreateSerializer


class FolderUpdateView(UpdateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderUpdateSerializer


class FolderDeleteView(DestroyAPIView):
    queryset = Folder.objects.all()


pass
pass
pass
pass
pass
pass


class NoteListView(ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteListSerializer


class NoteDetailView(RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteListSerializer


class NoteCreateView(CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateSerializer


class NoteUpdateView(UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteUpdateSerializer


class NoteDeleteView(DestroyAPIView):
    queryset = Note.objects.all()
