from levels.models import Level, Field, Hero, Object


def level(name, map):
    _assert_map_format_is_valid(map)
    width, height = len(map[0]), len(map)
    x, y = 0, height-1
    objects = {}

    for line in map:
        for char in line:
            if char not in level_object_ctors:
                x += 1
                continue
            object = create_level_object(x, y, char)
            if object.name not in objects:
                objects[object.name] = []
            objects[object.name].append(object)
            x += 1
        y -= 1
        x = 0

    field = Field(width, height, objects)
    return Level(name, field)


def _assert_map_format_is_valid(map):
    assert type(map) == list, f'Map must be an array of strings but was a {type(map)}.'
    assert all(type(line) == str for line in map), 'Map must be an array of strings.'
    width, height = len(map[0]), len(map)
    assert all(len(line) == width for line in map), 'Map mustn\'t have varying width.'
    assert width > 0 or height > 0, f'Map size ({width}, {height}) is invalid.'


def create_level_object(x, y, char):
    return level_object_ctors[char](x, y)


def level_to_json(level):
    if level.name in cached_level_jsons:
        return cached_level_jsons[level.name]

    objects_json = {}
    
    for object_list in level.field.objects.values():
        for object in object_list:
            if object.name == 'Hero': continue
            position_json = f'{object.position.x},{object.position.y}'
            if position_json not in objects_json:
                objects_json[position_json] = []
            objects_json[position_json].append(object.name)

    cached_level_jsons[level.name] = {
        'size': {
            'width': level.field.width,
            'height': level.field.height
        },
        'hero': {
            'x': level.hero.position.x,
            'y': level.hero.position.y,
        },
        'objects': objects_json
    }

    return cached_level_jsons[level.name]


cached_level_jsons = {}

level_object_ctors = {
    'H': lambda x, y: Hero(x, y),
    'P': lambda x, y: Object('Puddle', x, y),
}

levels = {
    1: level('level1', [
        '..P',
        '...',
        'H..',
    ]),
    2: level('level2', [
        '...',
        '...',
        'PP.',
        'HP.',
    ])  
}