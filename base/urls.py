from django.urls import path
from base.views import FolderListView, NoteListView, FolderDetailView, NoteDetailView, FolderCreateView, NoteCreateView, \
    FolderUpdateView, NoteUpdateView, FolderDeleteView, NoteDeleteView

urlpatterns = [
    path('folder/list/', FolderListView.as_view(), name='folder-list'),
    path('folder/detail/<int:pk>/', FolderDetailView.as_view(), name='folder-detail'),
    path('folder/create/', FolderCreateView.as_view(), name='folder-create'),
    path('folder/update/<int:pk>/', FolderUpdateView.as_view(), name='folder-update'),
    path('folder/delete/<int:pk>/', FolderDeleteView.as_view(), name='folder-delete'),

    path('note/list/', NoteListView.as_view(), name='note-list'),
    path('note/detail/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('note/create/', NoteCreateView.as_view(), name='note-create'),
    path('note/update/<int:pk>/', NoteUpdateView.as_view(), name='note-update'),
    path('note/delete/<int:pk>/', NoteDeleteView.as_view(), name='note-delete'),
]
