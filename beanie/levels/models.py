from django.db import models
from math import sin, cos, pi


class Vector2(models.Model):
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def dot(self, other):
        x = self.x * other.x
        y = self.y * other.y
        return Vector2(x, y)

    def __add__(self, other):
        x = self.x + other.x
        y = self.y + other.y
        return Vector2(x, y)

    def rotate(self, angle_in_radians):
        x, y, angle = self.x, self.y, angle_in_radians
        return Vector2(
            int(x * cos(angle) - y * sin(angle)),
            int(x * sin(angle) + y * cos(angle))
        )

    def __mul__(self, other):
        if type(other) == int or type(other) == float:
            x = self.x * other
            y = self.y * other
            return Vector2(x, y)
        else:
            message = f"unsupported operand type(s) for *: "
            message += f"'{type(self)}' and '{type(other)}'"
            raise TypeError(message)

    def __eq__(self, other):
        return (isinstance(other, Vector2) and 
            self.x == other.x and self.y == other.y)

    def __hash__(self):
        hash((self.x, self.y))

    def __iter__(self):
        return iter((self.x, self.y))

    def __str__(self):
        return f"({self.x}, {self.y})"


class Object(models.Model):
    def __init__(self, name, x=0, y=0):
        self.name = name
        self.position = Vector2(x, y)

    def __eq__(self, other):
        return (isinstance(other, Object) and 
            self.name == other.name and self.position == other.position)

    def __hash__(self):
        hash((self.name, self.position))

    def __str__(self):
        return f"{{ {self.name} at {self.position} }}"


class Hero(Object):
    def __init__(self, x=0, y=0):
        super().__init__('Hero', x, y)
        self.direction = Vector2(1, 0)
        self.velocity = 1

        self.commands = {
            'move': self.move_forward,
            'rotate left': self.rotate_counterclockwise
        }

    def accept_command(self, command):
        command = command.lower()
        self.commands[command]()

    def move_forward(self):
        # print(self.position)
        self.position = self.position + self.direction * self.velocity
        # print(self.position)
    
    def rotate_counterclockwise(self):
        self.direction = self.direction.rotate(pi/2)

    def rotate_clockwise(self):
        self.direction = self.direction.rotate(-pi/2)


class Path(models.Model):
    def __init__(self, level):
        self.level = level

    def build_json(self, commands):
        positions = []

        for command in commands:
            # TODO: Path shouldn't modify level's state
            self.level.accept_command(command)
            no_collision = not self.has_collision()
            position = self.level.field.hero.position
            positions.append({
                "x": position.x if no_collision else -1,
                "y": position.y if no_collision else -1
            })

        self.level.reload()
        return positions

    def has_collision(self):
        in_bounds = self.level.field.is_hero_in_bounds()
        collision = False
        if 'Puddle' in self.level.field.objects:
            for puddle in self.level.field.objects['Puddle']:
                if self.level.field.hero.position == puddle.position:
                    collision = True
                    break
        return not in_bounds or collision


class Field(models.Model):
    def __init__(self, width, height, objects):
        self._assert_objects_are_valid(objects)
        self.width = width
        self.height = height
        self.objects = objects
        self.hero = objects['Hero'][0]
        self.initial_hero_position = self.hero.position
        self.exit = objects['Exit'][0]

    def is_hero_in_bounds(self):
        x, y = self.hero.position
        width, height = self.width, self.height
        return x >= 0 and y >= 0 and x < width and y < height
    
    def reset_hero(self):
        x, y = self.initial_hero_position
        self.hero = Hero(x, y)

    def _assert_objects_are_valid(self, objects):
        hero_exists = 'Hero' in objects
        assert hero_exists, 'objects must contain a hero'
        hero_is_unique = len(objects['Hero']) == 1
        assert hero_is_unique, 'field cannot contain more than one hero'

        exit_exists = 'Exit' in objects
        assert exit_exists, 'objects must contain an exit'
        exit_is_unique = len(objects['Exit']) == 1
        assert exit_is_unique, 'field cannot contain more than one exit'



class Level(models.Model):
    def __init__(self, name, field):
        self.name = name
        self.field = field

    def accept_command(self, command):
        self.field.hero.accept_command(command)

    def reload(self):
        self.field.reset_hero()