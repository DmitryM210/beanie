from django.test import TestCase

from levels.models import Hero, Object
from levels.levels import level

# run tests: py manage.py test .\tests\

class LevelParsingTestCase(TestCase):
    def setUp(self):
        pass

    def test_map_with_hero_at_0_0(self):
        self.load_map_for_tests([
            '..',
            'H.',
        ])
        self.assert_level_is_correct(2, 2, Hero(0, 0))

    def test_map_with_hero_at_center(self):
        self.load_map_for_tests([
            '...',
            '.H.',
            '...',
        ])
        self.assert_level_is_correct(3, 3, Hero(1, 1))
    
    def test_map_with_hero_and_puddle(self):
        self.load_map_for_tests([
            '....',
            '....',
            '....',
            'H..P',
        ])
        self.assert_level_is_correct(4, 4, 
            Hero(0, 0), Object('Puddle', 3, 0), Object('Puddle', 3, 0))
    
    def test_map_with_hero_and_puddles(self):
        self.load_map_for_tests([
            'P.....',
            '.....P',
            '..H...',
            'P....P',
        ])
        self.assert_level_is_correct(6, 4, Hero(2, 1), 
            Object('Puddle', 0, 0), Object('Puddle', 0, 3),
            Object('Puddle', 5, 0), Object('Puddle', 5, 2))

    def test_map_with_no_heroes_fails(self):
        self.load_map_for_tests([
            'PPPP',
            '...P',
            '...P',
            'PPPP',
        ])
        self.assert_level_parsing_fails(AssertionError)

    def test_multiple_heroes_fails(self):
        self.load_map_for_tests([
            '...P',
            '....',
            '....',
            'H..H',
        ])
        self.assert_level_parsing_fails(AssertionError)

    def assert_level_is_correct(self, width, height, *expected_objects):
        self.parse_level_from_loaded_map()
        self.assert_level_size_is(width, height)
        for object in expected_objects:
            self.assert_level_has(object)

    def assert_level_parsing_fails(self, expected_error_type):
        self.assertRaises(expected_error_type, 
            lambda: self.parse_level_from_loaded_map())

    def assert_level_size_is(self, width, height):
        level = self.level
        self.assertEqual(level.field.width, width, 
            f'Expected width {width} but got {level.field.width}')
        self.assertEqual(level.field.height, height, 
            f'Expected height {height} but got {level.field.height}')

    def assert_level_has(self, object):
        level = self.level
        actual_objects = level.field.objects[object.name]
        contains_object = any(actual_object == object 
            for actual_object in actual_objects)
        message = f'Level doesn\'t contain {object}\n'
        message += f'but contains other {object.name} objects: {actual_objects}'
        self.assertTrue(contains_object, message)

    def parse_level_from_loaded_map(self):
        name = 'any_level_name'
        self.level = level(name, self.map)
        return self.level

    def load_map_for_tests(self, map):
        self.map = map
        return self.map
