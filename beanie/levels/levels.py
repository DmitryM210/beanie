from levels.models import Level, Field, Hero, Object


levels = {
    1: Level('level1', Field(2, 3, Hero())),
    2: Level('level2', Field(2, 4, Hero())),
}

level_object_ctors = {
    'H': lambda x, y: Hero(x, y),
    'P': lambda x, y: Object('Puddle', x, y),
}


# levels = {
#     1: Level('level1', Field(2, 3, { 'Hero': [Hero()] })),
#     2: Level('level2', Field(2, 4, { 'Hero': [Hero()] })),
# }

# map1 = [
#     '..',
#     '..',
#     'H.'
# ]


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