from django.db import models


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

    def __str__(self):
        return f"({self.x}, {self.y})"


class Hero(models.Model):
    def __init__(self):
        self.position = Vector2(0, 0)
        self.direction = Vector2(1, 0)
        self.velocity = 1

        self.commands = {
            'move': self.move,
            'rotate left': self.rotate_left
        }

    def accept_command(self, command):
        command = command.lower()
        self.commands[command](self)

    def move(self):
        self.position = self.position + self.direction * self.velocity
    
    def rotate_left(self):
        pass


class Field(models.Model):
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.hero = Hero()


class Level(models.Model):
    def __init__(self):
        self.field = Field(2, 3)
