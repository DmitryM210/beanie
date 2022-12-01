from django.test import TestCase
from beanie.models import Vector2, Hero

# run tests: py manage.py test .\tests\
# TODO: finish writing tests

class HeroTestCase(TestCase):
    def setUp(self):
        self.hero = Hero()

    def test_something_that_will_pass(self):
        self.assertFalse(False)

    def test_something_that_will_fail(self):
        self.assertTrue(False)

    def test_hero_moves_correctly(self):
        hero = self.Hero
        print(hero.position)
        self.assertEqual(hero.position, Vector2(0, 0))
        hero.move()
        print(hero.position)
        self.assertEqual(hero.position, Vector2(1, 0))