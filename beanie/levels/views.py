from django.http import JsonResponse

import json


def handle_commands(request):
    if not request.body:
        return JsonResponse({})
    
    body = json.loads(request.body)
    return JsonResponse(body)