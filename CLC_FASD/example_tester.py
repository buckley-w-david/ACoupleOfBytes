#Note: environment variable PYTHONPATH must be set to the root of the git repo (For example, on my machine C:\Users\buckl\Development\cis3750\ACoupleOfBytes)

import os, django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ACoupleOfBytes.settings")
django.setup()

import example_module

example_module.add_conn("testytesterson")
