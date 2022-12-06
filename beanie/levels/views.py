from django.http import JsonResponse

import json

from levels.models import Path, levels


# TODO: remove force-coded values
level = levels['level1']


def handle_commands(request):
    if not request.body:
        return JsonResponse({})
    
    body = json.loads(request.body)
    commands = body['commands']

    path = Path(level.hero).build(commands)
    level.reload()

    return JsonResponse({ 'path': path })


def get_level_info(request):
    return JsonResponse({ 
        'size': {
            'width': level.field.width,
            'height': level.field.height
        },
        'hero': {
            'x': level.hero.position.x,
            'y': level.hero.position.y
        }
    })