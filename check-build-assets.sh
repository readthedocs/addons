#!/bin/bash

npm run build

if [[ `git status dist/ --porcelain` ]]
then
    echo "ERROR: assets are out of date."
    echo "Run 'git add dist/*' to stash the changes before commiting."
    exit 1
fi
