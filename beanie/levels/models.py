from django.db import models

from math import sin, cos, pi


class Vector2(models.Model):
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def __add__(self, other):
        x = self.x + other.x
        y = self.y + other.y
        return Vector2(x, y)

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
        return self.x == other.x and self.y == other.y

    def __iter__(self):
        return iter((self.x, self.y))

    def __str__(self):
        return f"({self.x}, {self.y})"


class Hero(models.Model):
    def __init__(self, x=0, y=0):
        self.position = Vector2(x, y)
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
        print(self.position)
        self.position = self.position + self.direction * self.velocity
        print(self.position)
    
    def rotate_counterclockwise(self):
        self._rotate(pi/2)

    def rotate_clockwise(self):
        self._rotate(-pi/2)

    def _rotate(self, angle_in_radians):
        x, y = self.direction
        angle = angle_in_radians
        self.direction = Vector2(
            int(x * cos(angle) - y * sin(angle)),
            int(x * sin(angle) + y * cos(angle))
            )


# TODO: Path shouldn't modify hero's state
class Path(models.Model):
    def __init__(self, hero):
        self.hero = hero

    def build(self, commands):
        positions = []

        for command in commands:
            self.hero.accept_command(command)
            position = self.hero.position
            positions.append({
                "x": position.x,
                "y": position.y
                })

        return positions


class Field(models.Model):
    def __init__(self, width, height):
        self.width = width
        self.height = height


class Level(models.Model):
    def __init__(self, width, height, hero):
        self.field = Field(width, height)
        self.hero = hero

    def reload(self):
        self.hero = Hero()


levels = {
    'level1': Level(2, 3, Hero())
}