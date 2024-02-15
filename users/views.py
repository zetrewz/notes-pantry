from django.http import JsonResponse


def get_current_user(request):
    return JsonResponse({'id': request.user.id})
