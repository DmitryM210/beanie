from django.http import JsonResponse

import json

from levels.models import Field, Path


def handle_commands(request):
    if not request.body:
        return JsonResponse({})
    
    body = json.loads(request.body)
    commands = body['commands']

    # TODO: remove force-coded values
    field = Field(2, 3)
    path = Path(field).build(commands)
    
    return JsonResponse({ 'path': path })