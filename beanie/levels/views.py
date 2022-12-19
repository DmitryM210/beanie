from django.shortcuts import render
from django.http import JsonResponse, Http404

import json

from levels.models import Path, levels


def index(request, level_id=None):
    level = get_level_by_id(level_id)
    if level_id and not level:
        return level_not_found(level_id)
    return render(request, 'index.html')


def handle_commands(request, level_id):
    if not request.body:
        return JsonResponse({})

    level = get_level_by_id(level_id)
    if not level:
        return level_not_found(level_id)
    
    body = json.loads(request.body)
    commands = body['commands']
    path = Path(level).build_json(commands)

    return JsonResponse({ 'path': path })


def get_level_info(request, level_id):
    level = get_level_by_id(level_id)
    if not level:
        return level_not_found(level_id)

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


def level_not_found(level):
    message = f'Level {level} was not found'
    raise Http404(message)


def get_level_by_id(level_id):
    level_name = f'level{level_id}'
    if level_name in levels:
        return levels[level_name]
    else:
        return None