import os

project = 'Read the Docs Addons'
extensions = [
    'sphinx.ext.extlinks',
]
html_theme = 'furo'

html_context = {}

# Define the extlinks configuration
extlinks = {
    'pr': ('https://github.com/readthedocs/addons/pull/%s', 'PR #%s'),
}

# NOTE: this should be done automatically by the theme,
# but for some reason it's not working as I expect.
# https://github.com/pradyunsg/furo/blob/0439e84b3c2c5b168f22ea2e93c867fd37911dfa/docs/conf.py#L134
if "READTHEDOCS" in os.environ:
    html_context["READTHEDOCS"] = True
