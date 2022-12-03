from django.test import TestCase
from levels.models import Hero

# run tests: py manage.py test .\tests\

class HeroCommandsTestCase(TestCase):
    def setUp(self):
        pass

    def test_move_command_moves_hero(self):
        first_hero, second_hero = Hero(0, 0), Hero(0, 0)
        
        first_hero.accept_command('move')
        second_hero.move_forward()

        self.assert_hero_equal(first_hero, second_hero)

    def test_rotate_left_command_rotates_hero(self):
        first_hero, second_hero = Hero(0, 0), Hero(0, 0)
        
        first_hero.accept_command('rotate left')
        second_hero.rotate_counterclockwise()

        self.assert_hero_equal(first_hero, second_hero)

    def assert_hero_equal(self, hero, other_hero):
        self.assertEqual(hero.position, other_hero.position)
        self.assertEqual(hero.direction, other_hero.direction)
