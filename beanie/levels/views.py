from django.shortcuts import render
from django.http import JsonResponse, Http404

import json

from levels.models import Path
from levels.levels import levels


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


def get_level_list(request):
    level_list = list(map(level_to_level_href, levels.items()))
    return JsonResponse({
        'levels': level_list
    })


def level_to_level_href(item):
    level_id, level = item
    return {
        'name': level.name,
        'href': f'/level/{level_id}/'
    }


def level_not_found(level_id):
    message = f'Level {level_id} was not found'
    raise Http404(message)


def get_level_by_id(level_id):
    if level_id in levels:
        return levels[level_id]
    else:
        return None