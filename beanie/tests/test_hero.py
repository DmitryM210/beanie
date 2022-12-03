from django.test import TestCase
from levels.models import Vector2, Hero

# run tests: py manage.py test .\tests\

class HeroTestCase(TestCase):
    def setUp(self):
        pass

    def test_hero_moves(self):
        hero = self.create_hero(0, 0)
        hero.move_forward()
        self.assert_hero_is_at(1, 0)

    def test_hero_moves_from_initial_pos(self):
        hero = self.create_hero(1, 2)
        hero.move_forward()
        self.assert_hero_is_at(2, 2)

    def test_hero_looks_right_by_default(self):
        self.create_hero(0, 0)
        self.assert_hero_direction_is(1, 0)

    def test_hero_doesnt_move_when_rotates(self):
        hero = self.create_hero(0, 0)
        hero.rotate_counterclockwise()
        self.assert_hero_is_at(0, 0)
    
    def test_hero_rotates_counterclockwise(self):
        hero = self.create_hero(0, 0)
        hero.rotate_counterclockwise()
        self.assert_hero_direction_is(0, 1)
    
    def test_hero_rotates_clockwise(self):
        hero = self.create_hero(0, 0)
        hero.rotate_clockwise()
        self.assert_hero_direction_is(0, -1)

    def test_hero_moves_after_rotation(self):
        hero = self.create_hero(0, 0)
        hero.rotate_counterclockwise()
        hero.move_forward()
        self.assert_hero_is_at(0, 1)

    def test_hero_moves_to_0_0_position(self):
        hero = self.create_hero(1, 2)
        hero.rotate_clockwise()
        hero.move_forward()
        hero.move_forward()
        hero.rotate_clockwise()
        hero.move_forward()
        self.assert_hero_is_at(0, 0)
        self.assert_hero_direction_is(-1, 0)

    def create_hero(self, x, y):
        self.hero = Hero(x, y)
        return self.hero

    def assert_hero_is_at(self, x, y):
        actual_position = self.hero.position
        expected_position = Vector2(x, y)
        self.assertEqual(actual_position, expected_position)

    def assert_hero_direction_is(self, x, y):
        assert abs(x) <= 1 and abs(y) <= 1
        actual_direction = self.hero.direction
        expected_direction = Vector2(x, y)
        self.assertEqual(actual_direction, expected_direction)
